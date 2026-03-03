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


const SingleUserInvitesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [position, setPosition] = useState([]);
const [role, setRole] = useState([]);
const [company, setCompany] = useState([]);
const [branch, setBranch] = useState([]);
const [department, setDepartment] = useState([]);
const [section, setSection] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("userInvites")
            .get(urlParams.singleUserInvitesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"position","role","company","branch","department","section"] }})
            .then((res) => {
                set_entity(res || {});
                const position = Array.isArray(res.position)
            ? res.position.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.position
                ? [{ _id: res.position._id, name: res.position.name }]
                : [];
        setPosition(position);
const role = Array.isArray(res.role)
            ? res.role.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.role
                ? [{ _id: res.role._id, name: res.role.name }]
                : [];
        setRole(role);
const company = Array.isArray(res.company)
            ? res.company.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.company
                ? [{ _id: res.company._id, name: res.company.name }]
                : [];
        setCompany(company);
const branch = Array.isArray(res.branch)
            ? res.branch.map((elem) => ({ _id: elem._id, companyId: elem.companyId }))
            : res.branch
                ? [{ _id: res.branch._id, companyId: res.branch.companyId }]
                : [];
        setBranch(branch);
const department = Array.isArray(res.department)
            ? res.department.map((elem) => ({ _id: elem._id, deptName: elem.deptName }))
            : res.department
                ? [{ _id: res.department._id, deptName: res.department.deptName }]
                : [];
        setDepartment(department);
const section = Array.isArray(res.section)
            ? res.section.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.section
                ? [{ _id: res.section._id, name: res.section.name }]
                : [];
        setSection(section);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "UserInvites", type: "error", message: error.message || "Failed get userInvites" });
            });
    }, [props,urlParams.singleUserInvitesId]);


    const goBack = () => {
        navigate("/app/userInvites");
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
                    <h3 className="m-0">User Invites</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>userInvites/{urlParams.singleUserInvitesId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Email To Invite</label><p className="m-0 ml-3" >{_entity?.emailToInvite}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0" ><i id="status" className={`pi ${_entity?.status?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Send Mail Counter</label><p className="m-0 ml-3" >{Number(_entity?.sendMailCounter)}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Position</label>
                    {position.map((elem) => (
                        <Link key={elem._id} to={`/positions/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Role</label>
                    {role.map((elem) => (
                        <Link key={elem._id} to={`/roles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Company</label>
                    {company.map((elem) => (
                        <Link key={elem._id} to={`/companies/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Branch</label>
                    {branch.map((elem) => (
                        <Link key={elem._id} to={`/branches/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.companyId}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Department</label>
                    {department.map((elem) => (
                        <Link key={elem._id} to={`/departments/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.deptName}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Section</label>
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

      


      <CommentsSection
        recordId={urlParams.singleUserInvitesId}
        user={props.user}
        alert={props.alert}
        serviceName="userInvites"
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

export default connect(mapState, mapDispatch)(SingleUserInvitesPage);
