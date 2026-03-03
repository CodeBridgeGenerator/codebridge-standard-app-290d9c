import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import MenuItemsPage from "../MenuItemsPage/MenuItemsPage";

const SingleProfileMenuPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [user, setUser] = useState([]);
const [roles, setRoles] = useState([]);
const [positions, setPositions] = useState([]);
const [profiles, setProfiles] = useState([]);
const [company, setCompany] = useState([]);
const [branch, setBranch] = useState([]);
const [section, setSection] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("profileMenu")
            .get(urlParams.singleProfileMenuId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"user","roles","positions","profiles","company","branch","section"] }})
            .then((res) => {
                set_entity(res || {});
                const user = Array.isArray(res.user)
            ? res.user.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.user
                ? [{ _id: res.user._id, name: res.user.name }]
                : [];
        setUser(user);
const roles = Array.isArray(res.roles)
            ? res.roles.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.roles
                ? [{ _id: res.roles._id, name: res.roles.name }]
                : [];
        setRoles(roles);
const positions = Array.isArray(res.positions)
            ? res.positions.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.positions
                ? [{ _id: res.positions._id, name: res.positions.name }]
                : [];
        setPositions(positions);
const profiles = Array.isArray(res.profiles)
            ? res.profiles.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.profiles
                ? [{ _id: res.profiles._id, name: res.profiles.name }]
                : [];
        setProfiles(profiles);
const company = Array.isArray(res.company)
            ? res.company.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.company
                ? [{ _id: res.company._id, name: res.company.name }]
                : [];
        setCompany(company);
const branch = Array.isArray(res.branch)
            ? res.branch.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.branch
                ? [{ _id: res.branch._id, name: res.branch.name }]
                : [];
        setBranch(branch);
const section = Array.isArray(res.section)
            ? res.section.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.section
                ? [{ _id: res.section._id, name: res.section.name }]
                : [];
        setSection(section);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ProfileMenu", type: "error", message: error.message || "Failed get profileMenu" });
            });
    }, [props,urlParams.singleProfileMenuId]);


    const goBack = () => {
        navigate("/app/profileMenu");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Profile Menu</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>profileMenu/{urlParams.singleProfileMenuId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Menu Items</label><p className="m-0 ml-3" >{_entity?.menuItems}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">user</label>
                    {user.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">roles</label>
                    {roles.map((elem) => (
                        <Link key={elem._id} to={`/roles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">positions</label>
                    {positions.map((elem) => (
                        <Link key={elem._id} to={`/positions/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">profiles</label>
                    {profiles.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">company</label>
                    {company.map((elem) => (
                        <Link key={elem._id} to={`/companies/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">branch</label>
                    {branch.map((elem) => (
                        <Link key={elem._id} to={`/branches/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">section</label>
                    {section.map((elem) => (
                        <Link key={elem._id} to={`/sections/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Menu Items" leftIcon="pi pi-building-columns mr-2">
                        <MenuItemsPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleProfileMenuId}
        user={props.user}
        alert={props.alert}
        serviceName="profileMenu"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleProfileMenuPage);
