import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import { sortBy } from "lodash";
import SectionModal from "./SectionModal";
import getGradeYear from "../../store/actions/getGradeYear";
import deleteGradeYear from "../../store/actions/deleteGradeYear";
import CircualarProgress from "../Loaders/CircualarProgress";
import Scrollbars from "react-custom-scrollbars";

const SectionTable = ({
  gradeYearArr,
  pageLoaders,
  gradeYearGet,
  gradeYearDelete,
}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState({
    type: "",
    text: "",
  });
  const [editing, setEditing] = useState({});

  useEffect(() => {
    setItems(gradeYearArr);
    const elem = $("thead th");
    elem.find("i").fadeOut();
    elem.on("mouseover", (e) => {
      $(e.target).find("i").fadeIn();
    });
    elem.on("mouseleave", (e) => {
      $(e.target).find("i").fadeOut();
    });
  }, [gradeYearArr]);

  const handleOrder = (type, e) => {
    const elem = $(e.target).find("i");
    let newgradeYearArr;
    if (elem.hasClass("fa-arrow-up")) {
      elem.attr("class", "fa fa-arrow-down");
      newgradeYearArr = sortBy(items, (i) => i[type]);
    } else {
      elem.attr("class", "fa fa-arrow-up");
      newgradeYearArr = sortBy(items, (i) => i[type]).reverse();
    }
    setItems(newgradeYearArr);
  };

  const handleSearch = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setSearch({ ...search, [id]: val });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.text && search.type) {
      let newgradeYearArr = gradeYearArr.filter((i) =>
        i[search.type]
          .toString()
          .toLowerCase()
          .includes(search.text.toLowerCase())
      );
      setItems(newgradeYearArr);
    } else if (!search.type) {
      $("#type").focus();
    } else if (!search.text) {
      $("#text").focus();
      setItems(gradeYearArr);
    }
  };

  return (
    <div className="table-container">
      <div className="title-container">
        <h1 className="title">
          all grade years |{" "}
          <button onClick={gradeYearGet}>
            <i
              className={`fa fa-refresh ${
                pageLoaders.getGradeYear ? "fa-spin" : ""
              }`}
            ></i>
          </button>
        </h1>
        {gradeYearArr.length >= 1 && (
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
      {gradeYearArr.length >= 1 ? (
        <Scrollbars autoHide autoHeight autoHeightMax={500} autoHeightMin={100}>
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
                      condition={pageLoaders.deleteGradeYear === item.id}
                    >
                      <button onClick={(_) => gradeYearDelete(item.id)}>
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
        </Scrollbars>
      ) : (
        <div className="empty-container">
          <p>no available grade years</p>
        </div>
      )}
      {editing.id && <SectionModal editing={editing} setEditing={setEditing} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  gradeYearArr: state.gradeYearArr,
  pageLoaders: state.pageLoaders,
});

const mapDispatchToProps = (dispatch) => ({
  gradeYearGet: (_) => dispatch(getGradeYear()),
  gradeYearDelete: (id) => dispatch(deleteGradeYear(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionTable);
