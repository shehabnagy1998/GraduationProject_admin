import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import { sortBy } from "lodash";
import SectionModal from "./SectionModal";
import getCourse from "../../store/actions/getCourse";
import deleteCourse from "../../store/actions/deleteCourse";
import CircualarProgress from "../Loaders/CircualarProgress";

const SectionTable = ({ courseArr, pageLoaders, courseGet, courseDelete }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState({
    type: "",
    text: "",
  });
  const [editing, setEditing] = useState({});

  useEffect(() => {
    setItems(courseArr);
    const elem = $("thead th");
    elem.find("i").fadeOut();
    elem.on("mouseover", (e) => {
      $(e.target).find("i").fadeIn();
    });
    elem.on("mouseleave", (e) => {
      $(e.target).find("i").fadeOut();
    });
  }, [courseArr]);

  const handleOrder = (type, e) => {
    const elem = $(e.target).find("i");
    let newcourseArr;
    if (elem.hasClass("fa-arrow-up")) {
      elem.attr("class", "fa fa-arrow-down");
      newcourseArr = sortBy(items, (i) => i[type]);
    } else {
      elem.attr("class", "fa fa-arrow-up");
      newcourseArr = sortBy(items, (i) => i[type]).reverse();
    }
    setItems(newcourseArr);
  };

  const handleSearch = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setSearch({ ...search, [id]: val });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.text && search.type) {
      let newcourseArr = courseArr.filter((i) =>
        i[search.type]
          .toString()
          .toLowerCase()
          .includes(search.text.toLowerCase())
      );
      setItems(newcourseArr);
    } else if (!search.type) {
      $("#type").focus();
    } else if (!search.text) {
      $("#text").focus();
      setItems(courseArr);
    }
  };

  return (
    <div className="table-container">
      <div className="title-container">
        <h1 className="title">
          all courses |{" "}
          <button onClick={courseGet}>
            <i
              className={`fa fa-refresh ${
                pageLoaders.getCourse ||
                pageLoaders.getDepartment ||
                pageLoaders.getGradeYear ||
                pageLoaders.getAllUsers
                  ? "fa-spin"
                  : ""
              }`}
            ></i>
          </button>
        </h1>
        {courseArr.length >= 1 && (
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
              <option value="code">code</option>
              <option value="name">name</option>
              <option value="doctor_name">doctor</option>
              <option value="department_name">department</option>
              <option value="grade_year_name">grade year</option>
            </select>
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        )}
      </div>
      {courseArr.length >= 1 ? (
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th onClick={(e) => handleOrder("name", e)}>
                Code <i className="fa fa-arrow-up"></i>
              </th>
              <th onClick={(e) => handleOrder("name", e)}>
                Name <i className="fa fa-arrow-up"></i>
              </th>
              <th onClick={(e) => handleOrder("name", e)}>
                Doctor <i className="fa fa-arrow-up"></i>
              </th>
              <th onClick={(e) => handleOrder("name", e)}>
                Department <i className="fa fa-arrow-up"></i>
              </th>
              <th onClick={(e) => handleOrder("name", e)}>
                Grade Year <i className="fa fa-arrow-up"></i>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.code}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.doctor_name}</td>
                <td>{item.department_name}</td>
                <td>{item.grade_year_name}</td>
                <td className="action-col">
                  <CircualarProgress
                    effect={false}
                    condition={pageLoaders.deleteCourse === item.code}
                  >
                    <button onClick={(_) => courseDelete(item.code)}>
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
          <p>no available courses</p>
        </div>
      )}
      {editing.code && (
        <SectionModal editing={editing} setEditing={setEditing} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  courseArr: state.courseArr,
  pageLoaders: state.pageLoaders,
});

const mapDispatchToProps = (dispatch) => ({
  courseGet: (_) => dispatch(getCourse()),
  courseDelete: (id) => dispatch(deleteCourse(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionTable);
