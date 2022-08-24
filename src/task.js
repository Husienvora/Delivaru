import React, { useState, useContext, useEffect, useRef } from "react";
import { useGlobalContext } from "./context.js";
import "./index.css";
function Task() {
  const [Currtask, setCurrtask] = useState("");
  const [Upadting, setUpdating] = useState(false);
  const [Updatedoc, setUpdateddoc] = useState({
    name: null,
    completed: false,
  });
  const [UpdateID, setUpdateID] = useState();
  const { getAllTask, createTask, UpdateTask, deleteTask, Tasks } =
    useGlobalContext();
  const [CurrStatus, setCurrStatus] = useState();
  const [Refresh, setRefresh] = useState(false);
  useEffect(() => {
    getAllTask();
  }, [Refresh]);

  const button = useRef();
  const handleSubmit = (e) => {
    createTask(Currtask);

    e.preventDefault();
  };
  const Updatetask = (e) => {
    UpdateTask(UpdateID, Updatedoc.name, Updatedoc.completed);

    e.preventDefault();
  };
  return (
    <>
      <div className="Taskdiv">
        <form
          className="task-form "
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h1 style={{ justifyContent: "center" }}>Task Manager</h1>
          <div className="form-control">
            <input
              type="text"
              className="task"
              placeholder="e.g. Cycling"
              value={Currtask}
              onChange={(e) => setCurrtask(e.target.value)}
            />
            <button type="submit" className="submit-btn ">
              Create
            </button>
          </div>
        </form>
        <div>
          {Tasks ? (
            Tasks["tasks"].map((task) => {
              return (
                // <>
                //   <div>{task.name}</div>
                //   <div>{String(task.completed)}</div>
                // </>
                <>
                  <div className="tasktable ">
                    <div className="taskName">Name:{task.name}</div>
                    <div className="taskstatus">
                      Completed:{String(task.completed)}
                    </div>
                  </div>
                  {/* <table>
                    <tr className="tablerow">
                      <td></td>
                      <td></td>
                    </tr>
                  </table> */}
                  <button
                    onClick={() => {
                      deleteTask(task._id);
                    }}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setUpdating(true);
                      setUpdateID(task._id);
                    }}
                    className="update-btn"
                  >
                    Update
                  </button>
                </>
              );
            })
          ) : (
            <div></div>
          )}
          {Upadting ? (
            <div className="updateform">
              <form
                className="task-form"
                onSubmit={(e) => {
                  Updatetask(e);
                }}
              >
                <div className="form-control">
                  <input
                    type="text"
                    className="task"
                    placeholder="e.g. Cycling"
                    value={Updatedoc.name}
                    onChange={(e) =>
                      setUpdateddoc({
                        ...Updatedoc,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="taskstatus"
                    placeholder="Status"
                    value={Updatedoc.completed}
                    onChange={(e) =>
                      setUpdateddoc({
                        ...Updatedoc,
                        completed: e.target.value,
                      })
                    }
                  />

                  <button type="submit" className="submit-btn">
                    Update
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}
export default Task;
