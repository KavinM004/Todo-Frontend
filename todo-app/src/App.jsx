import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FcOvertime } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PuffLoader from "react-spinners/PuffLoader";
import FadeLoader from "react-spinners/BounceLoader";
import "./App.css";
import "./Star.scss";

function App() {
  // State variables for managing todo input, list of todos, and loading states
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [completionLoading, setCompletionLoading] = useState(false);
  const [editMode, setEditMode] = useState(false); // For edit mode
  const [editTodo, setEditTodo] = useState(null); // The todo being edited

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from the server
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://todo-backend-bboe.onrender.com/api/todos"
      );
      setAllTodos(response.data.filter((todo) => !todo.completedOn));
      setCompletedTodos(response.data.filter((todo) => todo.completedOn));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Function to handle adding a new todo
  const handleAddNewToDo = async () => {
    if (!newTodoTitle || !newDescription) {
      // alert("Title and description are required.");
      toast("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://todo-backend-bboe.onrender.com/api/todos",
        {
          title: newTodoTitle,
          description: newDescription,
          addedOn: new Date(),
        }
      );
      setAllTodos([...allTodos, response.data]);
      setNewTodoTitle("");
      setNewDescription("");
      toast.success("Todo added successfully!", { theme: "colored" });
    } catch (error) {
      console.error("Error adding new todo:", error);
      toast.error("Failed to add todo!", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle deleting a todo
  const handleToDoDelete = async (id) => {
    try {
      await axios.delete(
        `https://todo-backend-bboe.onrender.com/api/todos/${id}`
      );
      fetchTodos();
      toast.success("Todo deleted successfully!", { theme: "colored" });
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo!", { theme: "colored" });
    }
  };

  // Function to handle marking a todo as complete/incomplete
  const handleComplete = async (id) => {
    setCompletionLoading(true);
    try {
      let todo;
      let isUncomplete = false;
      if (isCompletedScreen) {
        todo = completedTodos.find((todo) => todo._id === id);
        isUncomplete = true;
      } else {
        todo = allTodos.find((todo) => todo._id === id);
      }

      const response = await axios.put(
        `https://todo-backend-bboe.onrender.com/api/todos/${id}`,
        {
          ...todo,
          completedOn: isUncomplete ? null : new Date(),
        }
      );

      if (isUncomplete) {
        toast.info("Todo moved back to incomplete!", { theme: "colored" });
        setAllTodos([...allTodos, response.data]);
        setCompletedTodos(completedTodos.filter((todo) => todo._id !== id));
      } else {
        toast.success("Todo completed successfully!", { theme: "colored" });
        setCompletedTodos([...completedTodos, response.data]);
        setAllTodos(allTodos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error("Error completing/uncompleting todo:", error);
    } finally {
      setCompletionLoading(false);
    }
  };

  // Function to handle deleting a completed todo
  const handleCompletedTodoDelete = async (id) => {
    try {
      await axios.delete(
        `https://todo-backend-bboe.onrender.com/api/todos/${id}`
      );
      fetchTodos();
      toast.success("Completed todo deleted successfully!", {
        theme: "colored",
      });
    } catch (error) {
      console.error("Error deleting completed todo:", error);
      toast.error("Failed to delete completed todo!", { theme: "colored" });
    }
  };

  // Function to handle editing a todo
  const handleEdit = (todo) => {
    setEditMode(true);
    setEditTodo(todo);
    setNewTodoTitle(todo.title);
    setNewDescription(todo.description);
  };

  // Function to handle updating a todo
  const handleUpdateTodo = async () => {
    if (!editTodo) return;
    setLoading(true);
    try {
      const response = await axios.put(
        `https://todo-backend-bboe.onrender.com/api/todos/${editTodo._id}`,
        {
          title: newTodoTitle,
          description: newDescription,
          addedOn: editTodo.addedOn,
        }
      );
      fetchTodos();
      toast.info("Todo updated successfully!", { theme: "colored" });
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo!", { theme: "colored" });
    } finally {
      setLoading(false);
      setEditMode(false);
      setEditTodo(null);
      setNewTodoTitle("");
      setNewDescription("");
    }
  };

  return (
    <>
      <div className="p-4 sm:p-8">
        <div className="stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        <ToastContainer />
        <h1 className="flex text-white text-3xl font-serif mt-4 justify-center">
          My Todos
        </h1>
        <div className="flex flex-col sm:flex-row mt-8 p-4 gap-4 rounded-lg">
          <div className="flex flex-col gap-1 w-full sm:w-1/2">
            <label htmlFor="todoTitle" className="text-white font-semibold">
              Title:
            </label>
            <input
              required
              id="todoTitle"
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Enter todo title..."
              className="rounded-xl px-4 py-2 w-full font-semibold text-md"
            />
          </div>
          <div className="flex flex-col gap-1 w-full sm:w-1/2">
            <label
              htmlFor="todoDescription"
              className="text-white font-semibold"
            >
              Description:
            </label>
            <input
              required
              id="todoDescription"
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter description..."
              className="rounded-xl px-4 py-2 w-full font-semibold text-md"
            />
          </div>
          <div className="mx-auto  sm:mx-0 sm:mt-7">
            {editMode ? (
              <button
                type="button"
                onClick={handleUpdateTodo}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600"
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddNewToDo}
                className="bg-green-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-green-600"
              >
                Add+
              </button>
            )}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div>
              <PuffLoader />
            </div>
          </div>
        ) : (
          <>
            <div className="btn-area mb-2">
              <button
                className={`secondaryBtn bg-gray-600 text-white px-4 py-2 cursor-pointer ${
                  !isCompletedScreen ? "bg-green-600" : ""
                }`}
                onClick={() => setIsCompletedScreen(false)}
              >
                To Do
              </button>
              <button
                className={`secondaryBtn bg-gray-600 text-white  px-4 py-2 cursor-pointer ${
                  isCompletedScreen ? "bg-green-600" : ""
                }`}
                onClick={() => setIsCompletedScreen(true)}
              >
                Completed
              </button>
            </div>

            <div
              className="todo-list flex flex-col h-[570px] overflow-y-scroll"
              style={{ paddingBottom: "2rem" }} // Add padding bottom here
            >
              {completionLoading && !isCompletedScreen ? (
                <div className="flex justify-center items-center mt-28">
                  <div>
                    <FadeLoader />
                  </div>
                </div>
              ) : !isCompletedScreen ? (
                allTodos.map((item) => (
                  <div
                    className="flex justify-between items-center bg-gray-900 p-6 mb-2 rounded-2xl shadow-sm relative"
                    key={item._id}
                  >
                    <input
                      type="checkbox"
                      className="absolute w-[20px] h-[20px] overflow-scroll"
                      onClick={() => handleComplete(item._id)}
                    />
                    <div className="ml-10 relative">
                      <h3 className="text-3xl text-green-500 font-semibold m-0">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-lg text-gray-400">
                        {item.description}
                      </p>
                      <p className="italic mt-2 text-sm text-gray-400 absolute">
                        <FcOvertime className="text-3xl" />
                      </p>
                      <p className="ml-9 mt-3 text-gray-400 font-semibold">
                        {item.addedOn}
                      </p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        title="Delete?"
                        className="icon text-3xl cursor-pointer text-[white] hover:text-red-600 ml-2"
                        onClick={() => handleToDoDelete(item._id)}
                      />
                      <AiOutlineEdit
                        title="Edit?"
                        className="icon text-3xl cursor-pointer text-[white] hover:text-blue-600 ml-2 mt-3"
                        onClick={() => handleEdit(item)}
                      />
                    </div>
                  </div>
                ))
              ) : completionLoading ? (
                <div className="flex justify-center items-center mt-28">
                  <div>
                    <FadeLoader />
                  </div>
                </div>
              ) : (
                completedTodos.map((item) => (
                  <div
                    className="flex justify-between items-center bg-gray-900 p-6 mb-2 rounded-2xl shadow-sm relative"
                    key={item._id}
                  >
                    <input
                      type="checkbox"
                      className="absolute w-[20px] h-[20px]"
                      checked
                      onClick={() => handleComplete(item._id)}
                    />
                    <div className="ml-10">
                      <h3 className="text-3xl text-green-500 font-semibold m-0">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-lg text-gray-400">
                        {item.description}
                      </p>
                      <p className="italic mt-2 text-sm text-gray-400 absolute">
                        <FcOvertime className="text-3xl" />
                      </p>
                      <p className="ml-9 mt-3 text-gray-400 font-semibold">
                        {item.addedOn}
                      </p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon text-3xl cursor-pointer text-white hover:text-red-600"
                        onClick={() => handleCompletedTodoDelete(item._id)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
