import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import { sortBy } from "lodash";
import SectionModal from "./SectionModal";
import listAll from "../../store/actions/listAll";
import unassignAssistants from "../../store/actions/unassignAssistants";
import CircualarProgress from "../Loaders/CircualarProgress";

const SectionTable = ({
  allCoursesAssistants,
  pageLoaders,
  allList,
  assistantsUnassignment,
}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState({
    type: "",
    text: "",
  });
  const [editing, setEditing] = useState({});

  useEffect(() => {
    setItems(allCoursesAssistants);
    const elem = $("thead th");
    elem.find("i").fadeOut();
    elem.on("mouseover", (e) => {
      $(e.target).find("i").fadeIn();
    });
    elem.on("mouseleave", (e) => {
      $(e.target).find("i").fadeOut();
    });
  }, [allCoursesAssistants]);

  const handleOrder = (type, e) => {
    const elem = $(e.target).find("i");
    let newallCoursesAssistants;
    if (elem.hasClass("fa-arrow-up")) {
      elem.attr("class", "fa fa-arrow-down");
      newallCoursesAssistants = sortBy(items, (i) => i[type]);
    } else {
      elem.attr("class", "fa fa-arrow-up");
      newallCoursesAssistants = sortBy(items, (i) => i[type]).reverse();
    }
    setItems(newallCoursesAssistants);
  };

  const handleSearch = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setSearch({ ...search, [id]: val });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.text && search.type) {
      let newallCoursesAssistants = allCoursesAssistants.filter((i) =>
        i[search.type]
          .toString()
          .toLowerCase()
          .includes(search.text.toLowerCase())
      );
      setItems(newallCoursesAssistants);
    } else if (!search.type) {
      $("#type").focus();
    } else if (!search.text) {
      $("#text").focus();
      setItems(allCoursesAssistants);
    }
  };

  return (
    <div className="table-container">
      <div className="title-container">
        <h1 className="title">
          all courses with assistants |{" "}
          <button onClick={allList}>
            <i
              className={`fa fa-refresh ${
                pageLoaders.listAll || pageLoaders.unassignAssistants
                  ? "fa-spin"
                  : ""
              }`}
            ></i>
          </button>
        </h1>
        {allCoursesAssistants.length >= 1 && (
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
              <option value="course_name">course name</option>
            </select>
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        )}
      </div>
      {allCoursesAssistants.length >= 1 ? (
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th onClick={(e) => handleOrder("name", e)}>
                Code <i className="fa fa-arrow-up"></i>
              </th>
              <th onClick={(e) => handleOrder("name", e)}>
                Name <i className="fa fa-arrow-up"></i>
              </th>
              <th>Assistants</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.code}>
                <td>{item.course_code}</td>
                <td>{item.course_name}</td>
                <td>
                  <div className="flex-column">
                    {item.assistants.map((i) => (
                      <span>{i.assistant_name}</span>
                    ))}
                  </div>
                </td>

                <td className="action-col">
                  <CircualarProgress
                    effect={false}
                    condition={
                      pageLoaders.unassignAssistants === item.course_code
                    }
                  >
                    <button
                      onClick={(_) => assistantsUnassignment(item.course_code)}
                    >
                      <i className="fa fa-close"></i>
                    </button>
                  </CircualarProgress>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-container">
          <p>no assistants assigned to courses</p>
        </div>
      )}
      {editing.code && (
        <SectionModal editing={editing} setEditing={setEditing} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allCoursesAssistants: state.allCoursesAssistants,
  pageLoaders: state.pageLoaders,
});

const mapDispatchToProps = (dispatch) => ({
  allList: (_) => dispatch(listAll()),
  assistantsUnassignment: (code) => dispatch(unassignAssistants(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionTable);
