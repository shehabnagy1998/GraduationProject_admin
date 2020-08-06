import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import { sortBy } from "lodash";
import getAllUsers from "../../store/actions/getAllUsers";
import deleteUser from "../../store/actions/deleteUser";
import CircualarProgress from "../Loaders/CircualarProgress";
import Scrollbars from "react-custom-scrollbars";

const SectionTable = ({
  userArr,
  pageLoaders,
  usersGet,
  userDelete,
  userDetails,
}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    setItems(userArr);
    const elem = $("thead th");
    elem.find("i").fadeOut();
    elem.on("mouseover", (e) => {
      $(e.target).find("i").fadeIn();
    });
    elem.on("mouseleave", (e) => {
      $(e.target).find("i").fadeOut();
    });
  }, [userArr]);

  const handleOrder = (type, e) => {
    const elem = $(e.target).find("i");
    let newuserArr;
    if (elem.hasClass("fa-arrow-up")) {
      elem.attr("class", "fa fa-arrow-down");
      newuserArr = sortBy(items, (i) => i[type]);
    } else {
      elem.attr("class", "fa fa-arrow-up");
      newuserArr = sortBy(items, (i) => i[type]).reverse();
    }
    setItems(newuserArr);
  };

  const handleSearch = (e) => {
    const id = e.target.id,
      val = e.target.value;
    setSearch({ ...search, [id]: val });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.text && search.type) {
      let newuserArr = userArr.filter((i) =>
        i[search.type]
          .toString()
          .toLowerCase()
          .includes(search.text.toLowerCase())
      );
      setItems(newuserArr);
    } else if (!search.type) {
      $("#type").focus();
    } else if (!search.text) {
      $("#text").focus();
      setItems(userArr);
    }
  };
  console.log(items);
  return (
    <div className="table-container">
      <div className="title-container">
        <h1 className="title">
          all admins |{" "}
          <button onClick={(_) => usersGet({ role_id: 3 })}>
            <i
              className={`fa fa-refresh ${
                pageLoaders.getAllUsers ? "fa-spin" : ""
              }`}
            ></i>
          </button>
        </h1>
        {userArr.length >= 1 && (
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
            </select>
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        )}
      </div>
      {userArr.length >= 1 ? (
        <Scrollbars autoHide autoHeight autoHeightMax={500} autoHeightMin={100}>
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th onClick={(e) => handleOrder("name", e)}>
                  code <i className="fa fa-arrow-up"></i>
                </th>
                <th onClick={(e) => handleOrder("name", e)}>
                  Name <i className="fa fa-arrow-up"></i>
                </th>
                <th onClick={(e) => handleOrder("is_approved", e)}>
                  Action <i className="fa fa-arrow-up"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  {item.code !== userDetails.code && (
                    <td className="action-col">
                      <CircualarProgress
                        effect={false}
                        condition={pageLoaders.deleteUser === item.code}
                      >
                        <button
                          onClick={(_) =>
                            userDelete({ code: item.code, role_id: 3 })
                          }
                        >
                          <i className="fa fa-close"></i>
                        </button>
                      </CircualarProgress>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Scrollbars>
      ) : (
        <div className="empty-container">
          <p>no available admins</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userArr: state.userArr,
  pageLoaders: state.pageLoaders,
  userDetails: state.userDetails,
});

const mapDispatchToProps = (dispatch) => ({
  usersGet: (_) => dispatch(getAllUsers()),
  userDelete: (id) => dispatch(deleteUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionTable);
