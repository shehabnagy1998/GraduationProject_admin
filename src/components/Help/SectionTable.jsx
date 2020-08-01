import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import { sortBy } from "lodash";
import SectionModal from "./SectionModal";
import getHelps from "../../store/actions/getHelps";

const SectionTable = ({ helpArr, pageLoaders, helpGet, departmentDelete }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState({
    type: "",
    text: "",
  });
  const [editing, setEditing] = useState({});
  console.log(helpArr);

  useEffect(() => {
    setItems(helpArr);
    const elem = $("thead th");
    elem.find("i").fadeOut();
    elem.on("mouseover", (e) => {
      $(e.target).find("i").fadeIn();
    });
    elem.on("mouseleave", (e) => {
      $(e.target).find("i").fadeOut();
    });
  }, [helpArr]);

  const handleOrder = (type, e) => {
    const elem = $(e.target).find("i");
    let helpArr;
    if (elem.hasClass("fa-arrow-up")) {
      elem.attr("class", "fa fa-arrow-down");
      helpArr = sortBy(items, (i) => i[type]);
    } else {
      elem.attr("class", "fa fa-arrow-up");
      helpArr = sortBy(items, (i) => i[type]).reverse();
    }
    setItems(helpArr);
  };

  const handleSearch = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setSearch({ ...search, [id]: val });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.text && search.type) {
      let helpArr = helpArr.filter((i) =>
        i[search.type]
          .toString()
          .toLowerCase()
          .includes(search.text.toLowerCase())
      );
      setItems(helpArr);
    } else if (!search.type) {
      $("#type").focus();
    } else if (!search.text) {
      $("#text").focus();
      setItems(helpArr);
    }
  };

  return (
    <div className="table-container">
      <div className="title-container">
        <h1 className="title">
          Help Requests |{" "}
          <button onClick={helpGet}>
            <i
              className={`fa fa-refresh ${
                pageLoaders.getHelps ? "fa-spin" : ""
              }`}
            ></i>
          </button>
        </h1>
        {helpArr.length >= 1 && (
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
              <option value="subject">subject</option>
            </select>
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        )}
      </div>
      {helpArr.length >= 1 ? (
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th onClick={(e) => handleOrder("subject", e)}>
                subject <i className="fa fa-arrow-up"></i>
              </th>
              <th onClick={(e) => handleOrder("issuer", e)}>
                issuer <i className="fa fa-arrow-up"></i>
              </th>
              <th onClick={(e) => handleOrder("issuer", e)}>
                solved <i className="fa fa-arrow-up"></i>
              </th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.subject}</td>
                <td>{item.issuer}</td>
                <td>
                  {item.solution ? (
                    <div className="green-dot" />
                  ) : (
                    <div className="red-dot" />
                  )}
                </td>
                <td className="action-col">
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
          <p>no available help requests</p>
        </div>
      )}
      {editing.id && <SectionModal editing={editing} setEditing={setEditing} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  helpArr: state.helpArr,
  pageLoaders: state.pageLoaders,
});

const mapDispatchToProps = (dispatch) => ({
  helpGet: () => dispatch(getHelps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionTable);
