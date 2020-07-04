import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import { sortBy } from "lodash";
import SectionModal from "./SectionModal";
import getAnnouncement from "../../store/actions/getAnnouncement";
import deleteAnnouncement from "../../store/actions/deleteAnnouncement";
import CircualarProgress from "../Loaders/CircualarProgress";

const SectionTable = ({
  announcementArr,
  pageLoaders,
  announcementGet,
  announcementDelete,
}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState({
    type: "",
    text: "",
  });
  const [editing, setEditing] = useState({});

  useEffect(() => {
    setItems(announcementArr);
    const elem = $("thead th");
    elem.find("i").fadeOut();
    elem.on("mouseover", (e) => {
      $(e.target).find("i").fadeIn();
    });
    elem.on("mouseleave", (e) => {
      $(e.target).find("i").fadeOut();
    });
  }, [announcementArr]);

  const handleOrder = (type, e) => {
    const elem = $(e.target).find("i");
    let announcementArr;
    if (elem.hasClass("fa-arrow-up")) {
      elem.attr("class", "fa fa-arrow-down");
      announcementArr = sortBy(items, (i) => i[type]);
    } else {
      elem.attr("class", "fa fa-arrow-up");
      announcementArr = sortBy(items, (i) => i[type]).reverse();
    }
    setItems(announcementArr);
  };

  const handleSearch = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setSearch({ ...search, [id]: val });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.text && search.type) {
      let announcementArr = announcementArr.filter((i) =>
        i[search.type]
          .toString()
          .toLowerCase()
          .includes(search.text.toLowerCase())
      );
      setItems(announcementArr);
    } else if (!search.type) {
      $("#type").focus();
    } else if (!search.text) {
      $("#text").focus();
      setItems(announcementArr);
    }
  };

  return (
    <div className="table-container">
      <div className="title-container">
        <h1 className="title">
          all announcement |{" "}
          <button onClick={announcementGet}>
            <i
              className={`fa fa-refresh ${
                pageLoaders.getAnnouncement ? "fa-spin" : ""
              }`}
            ></i>
          </button>
        </h1>
        {announcementArr.length >= 1 && (
          <form className="search-container" onSubmit={handleSubmitSearch}>
            <input
              type="search"
              id="text"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <select
              id="type"
              onChange={(e) => setSearch({ ...search, type: e.target.value })}
            >
              <option value="">choose one</option>
              <option value="title">title</option>
              <option value="text">text</option>
            </select>
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        )}
      </div>
      {announcementArr.length >= 1 ? (
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th onClick={(e) => handleOrder("title", e)}>
                title <i className="fa fa-arrow-up"></i>
              </th>
              <th>text</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.text}</td>
                <td className="action-col">
                  <CircualarProgress
                    effect={false}
                    condition={pageLoaders.deleteAnnouncement === item.id}
                  >
                    <button onClick={(_) => announcementDelete(item.id)}>
                      <i className="fa fa-close"></i>
                    </button>
                  </CircualarProgress>
                  <button onClick={(_) => setEditing(item)}>
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-container">
          <p>no available announcements</p>
        </div>
      )}
      {editing.id && <SectionModal editing={editing} setEditing={setEditing} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  announcementArr: state.announcementArr,
  pageLoaders: state.pageLoaders,
});

const mapDispatchToProps = (dispatch) => ({
  announcementGet: (_) => dispatch(getAnnouncement()),
  announcementDelete: (id) => dispatch(deleteAnnouncement(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionTable);
