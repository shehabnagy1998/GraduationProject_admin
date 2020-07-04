import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import { sortBy } from "lodash";
import SectionModal from "./SectionModal";
import getDepartment from "../../store/actions/getDepartment";
import deleteDepartment from "../../store/actions/deleteDepartment";
import CircualarProgress from "../Loaders/CircualarProgress";

const SectionTable = ({
  departmentArr,
  pageLoaders,
  departmentGet,
  departmentDelete,
}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState({
    type: "",
    text: "",
  });
  const [editing, setEditing] = useState({});

  useEffect(() => {
    setItems(departmentArr);
    const elem = $("thead th");
    elem.find("i").fadeOut();
    elem.on("mouseover", (e) => {
      $(e.target).find("i").fadeIn();
    });
    elem.on("mouseleave", (e) => {
      $(e.target).find("i").fadeOut();
    });
  }, [departmentArr]);

  const handleOrder = (type, e) => {
    const elem = $(e.target).find("i");
    let newdepartmentArr;
    if (elem.hasClass("fa-arrow-up")) {
      elem.attr("class", "fa fa-arrow-down");
      newdepartmentArr = sortBy(items, (i) => i[type]);
    } else {
      elem.attr("class", "fa fa-arrow-up");
      newdepartmentArr = sortBy(items, (i) => i[type]).reverse();
    }
    setItems(newdepartmentArr);
  };

  const handleSearch = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setSearch({ ...search, [id]: val });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.text && search.type) {
      let newdepartmentArr = departmentArr.filter((i) =>
        i[search.type]
          .toString()
          .toLowerCase()
          .includes(search.text.toLowerCase())
      );
      setItems(newdepartmentArr);
    } else if (!search.type) {
      $("#type").focus();
    } else if (!search.text) {
      $("#text").focus();
      setItems(departmentArr);
    }
  };

  return (
    <div className="table-container">
      <div className="title-container">
        <h1 className="title">
          all departments |{" "}
          <button onClick={departmentGet}>
            <i
              className={`fa fa-refresh ${
                pageLoaders.getDepartment || pageLoaders.getInstitute
                  ? "fa-spin"
                  : ""
              }`}
            ></i>
          </button>
        </h1>
        {departmentArr.length >= 1 && (
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
              <option value="name">institute</option>
            </select>
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        )}
      </div>
      {departmentArr.length >= 1 ? (
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th onClick={(e) => handleOrder("name", e)}>
                Name <i className="fa fa-arrow-up"></i>
              </th>
              <th onClick={(e) => handleOrder("institute_name", e)}>
                insitute <i className="fa fa-arrow-up"></i>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.institute_name}</td>
                <td className="action-col">
                  <CircualarProgress
                    effect={false}
                    condition={pageLoaders.deleteDepartment === item.id}
                  >
                    <button onClick={(_) => departmentDelete(item.id)}>
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
          <p>no available department</p>
        </div>
      )}
      {editing.id && <SectionModal editing={editing} setEditing={setEditing} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  departmentArr: state.departmentArr,
  pageLoaders: state.pageLoaders,
});

const mapDispatchToProps = (dispatch) => ({
  departmentGet: (_) => dispatch(getDepartment()),
  departmentDelete: (id) => dispatch(deleteDepartment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionTable);
