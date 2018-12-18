import React from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

export class TabsNavigation extends React.Component {
  render() {
    const { movieData } = this.props;
    return (
      <Nav tabs className="mt-3">
        <NavItem>
          <NavLink
            activeClassName="active"
            className="tab-link text-center link"
            to={`/movie/${movieData.id}/detail`}
          >
            Детали
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            activeClassName="active"
            className="tab-link text-center link"
            to={`/movie/${movieData.id}/similar`}
          >
            Похожие фильмы
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            activeClassName="active"
            className="tab-link text-center link"
            to={`/movie/${movieData.id}/videos`}
          >
            Видео
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            activeClassName="active"
            className="tab-link text-center link"
            to={`/movie/${movieData.id}/credits`}
          >
            Акторы
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            activeClassName="active"
            className="tab-link text-center link"
            to={`/movie/${movieData.id}/crew`}
          >
            Команда
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}
