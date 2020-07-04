import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import { sortBy } from "lodash";
import SectionModal from "./SectionModal";
import getInstitute from "../../store/actions/getInstitute";
import deleteInstitute from "../../store/actions/deleteInstitute";
import CircualarProgress from "../Loaders/CircualarProgress";

const SectionTable = ({
  instituteArr,
  pageLoaders,
  instituteGet,
  instituteDelete,
}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState({
    type: "",
    text: "",
  });
  const [editing, setEditing] = useState({});

  useEffect(() => {
    setItems(instituteArr);
    const elem = $("thead th");
    elem.find("i").fadeOut();
    elem.on("mouseover", (e) => {
      $(e.target).find("i").fadeIn();
    });
    elem.on("mouseleave", (e) => {
      $(e.target).find("i").fadeOut();
    });
  }, [instituteArr]);

  const handleOrder = (type, e) => {
    const elem = $(e.target).find("i");
    let newinstituteArr;
    if (elem.hasClass("fa-arrow-up")) {
      elem.attr("class", "fa fa-arrow-down");
      newinstituteArr = sortBy(items, (i) => i[type]);
    } else {
      elem.attr("class", "fa fa-arrow-up");
      newinstituteArr = sortBy(items, (i) => i[type]).reverse();
    }
    setItems(newinstituteArr);
  };

  const handleSearch = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setSearch({ ...search, [id]: val });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.text && search.type) {
      let newinstituteArr = instituteArr.filter((i) =>
        i[search.type]
          .toString()
          .toLowerCase()
          .includes(search.text.toLowerCase())
      );
      setItems(newinstituteArr);
    } else if (!search.type) {
      $("#type").focus();
    } else if (!search.text) {
      $("#text").focus();
      setItems(instituteArr);
    }
  };

  return (
    <div className="table-container">
      <div className="title-container">
        <h1 className="title">
          all institutes |{" "}
          <button onClick={instituteGet}>
            <i
              className={`fa fa-refresh ${
                pageLoaders.getInstitute ? "fa-spin" : ""
              }`}
            ></i>
          </button>
        </h1>
        {instituteArr.length >= 1 && (
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
              <option value="name">name</option>
            </select>
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        )}
      </div>
      {instituteArr.length >= 1 ? (
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th onClick={(e) => handleOrder("name", e)}>
                Name <i className="fa fa-arrow-up"></i>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="action-col">
                  <CircualarProgress
                    effect={false}
                    condition={pageLoaders.deleteInstitute === item.id}
                  >
                    <button onClick={(_) => instituteDelete(item.id)}>
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
          <p>no available institutes</p>
        </div>
      )}
      {editing.id && <SectionModal editing={editing} setEditing={setEditing} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  instituteArr: state.instituteArr,
  pageLoaders: state.pageLoaders,
});

const mapDispatchToProps = (dispatch) => ({
  instituteGet: (_) => dispatch(getInstitute()),
  instituteDelete: (id) => dispatch(deleteInstitute(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionTable);
