import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
const initialState = { Alltodos: [], todoToEdit: " " };
const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { value, todoToEdit } = action.payload;
      if (value !== "" || todoToEdit !== "") {
        let new_todo = {};
        new_todo.id = crypto.randomUUID();
        new_todo.title = value ? value : todoToEdit;
        new_todo.completed = false;
        state.Alltodos.push(new_todo);
        new_todo = {};
      }
      if (state.todoToEdit != " ") {
        Swal.fire({
          title: "Edited done!",
          icon: "success",
          draggable: true,
        });
        state.todoToEdit = " ";
      }
    },
    toCompleted: (state, action) => {
      state.Alltodos = state.Alltodos.map((item) => {
        if (item.id === action.payload) {
          return { ...item, completed: !item.completed };
        }
        return item; // Ensure other items are returned unchanged
      });
    },
    toDelete: (state, action) => {
      state.Alltodos = state.Alltodos.filter((item) => {
        return item.id !== action.payload;
      });
    },
    toDeleteEdit: (state, action) => {
      const { id, title } = action.payload;
      state.todoToEdit = title;

      state.Alltodos = state.Alltodos.filter((item) => {
        return item.id !== id;
      });
    },
    // toEdit: (state, action) => {
    //   const { id, title } = action.payload;
    //   state.todoToEdit = title;

    //   state.Alltodos = state.Alltodos.filter((item) => {
    //     return item.id !== id;
    //   });
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchAlert.fulfilled, () => {})
  //     .addCase(fetchAlert.pending, () => {
  //       console.log("pending");
  //     })
  //     .addCase(fetchAlert.rejected, () => {
  //       console.log("rejected");
  //     });
  // },
});

export const fetchAlert = createAsyncThunk(
  "fetchingAlert",
  async (id, { dispatch }) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      dispatch(toDelete(id)); ///important
    }
  }
);
export const fetchEditAlert = createAsyncThunk(
  "fetchingEditAlert",
  async ({ id, title }, { dispatch }) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to edit task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    });

    if (result.isConfirmed) {
      dispatch(toDeleteEdit({ id, title })); ///important
    }
  }
);
export default TodosSlice.reducer;
export const { addTodo, toCompleted, toDelete, toEdit, toDeleteEdit } =
  TodosSlice.actions;
