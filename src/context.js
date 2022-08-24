import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [Tasks, setTasks] = useState();
  const [data, setData] = useState([]);

  const BaseUrl = "http://localhost:5000/api/v1";

  useEffect(() => {
    getImage();
    getAllTask();
  }, []);

  const getImage = async () => {
    await axios
      .get(BaseUrl + "/image/getAllImages")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  };

  const UploadImage = async (id, formData) => {
    try {
      await axios
        .post(BaseUrl + "/image/uploadimage", formData, {
          name: "testImage",
          id: id,
        })
        .then((res) => {
          return res.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteImages = async (id) => {
    try {
      await axios
        .post(BaseUrl + "/image/deleteImages", {
          id: id,
        })
        .then((res) => {
          return res.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTask = async () => {
    await axios
      .get(BaseUrl + "/task")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err, "it has an error"));
  };
  const createTask = async (name) => {
    try {
      console.log(name);
      await axios
        .post(BaseUrl + "/task", {
          name: name,
          completed: "false",
        })
        .then((res) => {
          return res.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateTask = async (id, name, completed) => {
    try {
      await axios
        .patch(BaseUrl + `/task/${id}`, {
          name: name,
          completed: completed,
        })
        .then((res) => {
          return res.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(BaseUrl + `/task/${id}`).then((res) => {
        return res.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        getImage,
        UploadImage,
        DeleteImages,
        getAllTask,
        createTask,
        UpdateTask,
        deleteTask,
        data,
        Tasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
