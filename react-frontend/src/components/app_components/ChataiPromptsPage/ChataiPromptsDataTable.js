import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";
import { Checkbox } from "primereact/checkbox";

const ChataiPromptsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);
  const header = (
    <div
      className="table-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h5 className="m-0"></h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.session}</p>
const dropdownTemplate1 = (rowData, { rowIndex }) => <p >{rowData.chatAiEnabler?.name}</p>
const dropdownTemplate2 = (rowData, { rowIndex }) => <p >{rowData.chatAiConfig?.name}</p>
const editorTemplate3 = (rowData, { rowIndex }) => <div  dangerouslySetInnerHTML={{__html: rowData.prompt}}></div>
const file_uploadTemplate4 = (rowData, { rowIndex }) => <div  > </div>
const inputTextareaTemplate5 = (rowData, { rowIndex }) => <p >{rowData.responseText}</p>
const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.systemId}</p>
const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.type}</p>
const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.role}</p>
const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.model}</p>
const inputTextareaTemplate10 = (rowData, { rowIndex }) => <p >{rowData.params}</p>
const inputTextareaTemplate11 = (rowData, { rowIndex }) => <p >{rowData.stopReason}</p>
const inputTextareaTemplate12 = (rowData, { rowIndex }) => <p >{rowData.stopSequence}</p>
const p_numberTemplate13 = (rowData, { rowIndex }) => <p >{rowData.inputTokens}</p>
const p_numberTemplate14 = (rowData, { rowIndex }) => <p >{rowData.outputTokens}</p>
const currencyTemplate15 = (rowData, { rowIndex }) => <InputNumber value={rowData.cost}  mode="currency" currency="MYR" locale="en-US" disabled={true} useGrouping={false} />
const p_booleanTemplate16 = (rowData, { rowIndex }) => <p >{String(rowData.status)}</p>
const inputTextareaTemplate17 = (rowData, { rowIndex }) => <p >{rowData.error}</p>
const inputTextareaTemplate18 = (rowData, { rowIndex }) => <p >{rowData.userRemarks}</p>
const p_booleanTemplate19 = (rowData, { rowIndex }) => <p >{String(rowData.thumbsDown)}</p>
const p_booleanTemplate20 = (rowData, { rowIndex }) => <p >{String(rowData.thumbsUp)}</p>
const p_booleanTemplate21 = (rowData, { rowIndex }) => <p >{String(rowData.copies)}</p>
const p_booleanTemplate22 = (rowData, { rowIndex }) => <p >{String(rowData.emailed)}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        globalFilter={globalFilter}
        header={header}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="session" header="Session" body={pTemplate0} filter={selectedFilterFields.includes("session")} hidden={selectedHideFields?.includes("session")}  sortable style={{ minWidth: "8rem" }} />
<Column field="chatAiEnabler" header="Chat AI Enabler" body={dropdownTemplate1} filter={selectedFilterFields.includes("chatAiEnabler")} hidden={selectedHideFields?.includes("chatAiEnabler")}  style={{ minWidth: "8rem" }} />
<Column field="chatAiConfig" header="Chat Ai Config" body={dropdownTemplate2} filter={selectedFilterFields.includes("chatAiConfig")} hidden={selectedHideFields?.includes("chatAiConfig")}  style={{ minWidth: "8rem" }} />
<Column field="prompt" header="Prompt" body={editorTemplate3} filter={selectedFilterFields.includes("prompt")} hidden={selectedHideFields?.includes("prompt")}  sortable style={{ minWidth: "8rem" }} />
<Column field="refDocs" header="Ref Docs" body={file_uploadTemplate4} filter={selectedFilterFields.includes("refDocs")} hidden={selectedHideFields?.includes("refDocs")}  sortable style={{ minWidth: "8rem" }} />
<Column field="responseText" header="Response Text" body={inputTextareaTemplate5} filter={selectedFilterFields.includes("responseText")} hidden={selectedHideFields?.includes("responseText")}  sortable style={{ minWidth: "8rem" }} />
<Column field="systemId" header="System Id" body={pTemplate6} filter={selectedFilterFields.includes("systemId")} hidden={selectedHideFields?.includes("systemId")}  sortable style={{ minWidth: "8rem" }} />
<Column field="type" header="Type" body={pTemplate7} filter={selectedFilterFields.includes("type")} hidden={selectedHideFields?.includes("type")}  sortable style={{ minWidth: "8rem" }} />
<Column field="role" header="Role" body={pTemplate8} filter={selectedFilterFields.includes("role")} hidden={selectedHideFields?.includes("role")}  sortable style={{ minWidth: "8rem" }} />
<Column field="model" header="Model" body={pTemplate9} filter={selectedFilterFields.includes("model")} hidden={selectedHideFields?.includes("model")}  sortable style={{ minWidth: "8rem" }} />
<Column field="params" header="Params" body={inputTextareaTemplate10} filter={selectedFilterFields.includes("params")} hidden={selectedHideFields?.includes("params")}  sortable style={{ minWidth: "8rem" }} />
<Column field="stopReason" header="Stop Reason" body={inputTextareaTemplate11} filter={selectedFilterFields.includes("stopReason")} hidden={selectedHideFields?.includes("stopReason")}  sortable style={{ minWidth: "8rem" }} />
<Column field="stopSequence" header="Stop Sequence" body={inputTextareaTemplate12} filter={selectedFilterFields.includes("stopSequence")} hidden={selectedHideFields?.includes("stopSequence")}  sortable style={{ minWidth: "8rem" }} />
<Column field="inputTokens" header="Input Tokens" body={p_numberTemplate13} filter={selectedFilterFields.includes("inputTokens")} hidden={selectedHideFields?.includes("inputTokens")}  sortable style={{ minWidth: "8rem" }} />
<Column field="outputTokens" header="Output Tokens" body={p_numberTemplate14} filter={selectedFilterFields.includes("outputTokens")} hidden={selectedHideFields?.includes("outputTokens")}  sortable style={{ minWidth: "8rem" }} />
<Column field="cost" header="Cost" body={currencyTemplate15} filter={selectedFilterFields.includes("cost")} hidden={selectedHideFields?.includes("cost")}  style={{ minWidth: "8rem" }} />
<Column field="status" header="Status" body={p_booleanTemplate16} filter={selectedFilterFields.includes("status")} hidden={selectedHideFields?.includes("status")}  style={{ minWidth: "8rem" }} />
<Column field="error" header="Error" body={inputTextareaTemplate17} filter={selectedFilterFields.includes("error")} hidden={selectedHideFields?.includes("error")}  sortable style={{ minWidth: "8rem" }} />
<Column field="userRemarks" header="User Remarks" body={inputTextareaTemplate18} filter={selectedFilterFields.includes("userRemarks")} hidden={selectedHideFields?.includes("userRemarks")}  sortable style={{ minWidth: "8rem" }} />
<Column field="thumbsDown" header="Thumbs Down" body={p_booleanTemplate19} filter={selectedFilterFields.includes("thumbsDown")} hidden={selectedHideFields?.includes("thumbsDown")}  style={{ minWidth: "8rem" }} />
<Column field="thumbsUp" header="Thumbs Up" body={p_booleanTemplate20} filter={selectedFilterFields.includes("thumbsUp")} hidden={selectedHideFields?.includes("thumbsUp")}  style={{ minWidth: "8rem" }} />
<Column field="copies" header="Copies" body={p_booleanTemplate21} filter={selectedFilterFields.includes("copies")} hidden={selectedHideFields?.includes("copies")}  style={{ minWidth: "8rem" }} />
<Column field="emailed" header="Emailed" body={p_booleanTemplate22} filter={selectedFilterFields.includes("emailed")} hidden={selectedHideFields?.includes("emailed")}  style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload ChataiPrompts Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="chataiPrompts"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search ChataiPrompts" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default ChataiPromptsDataTable;