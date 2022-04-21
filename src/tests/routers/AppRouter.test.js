import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { AppRouter } from "../../routers/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// store.dispatch = jest.fn()

describe("Pruebas en AppRouter", () => {
  test("debe mostrarse correctamente", () => {
    const initState = {
      auth: {
        checking: true,
      },
    };
    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter></AppRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("debe mostrar la ruta publica", () => {
    const initState = {
      auth: {
        checking: false,
        uid: null,
      },
    };
    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter></AppRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("debe mostrar la ruta privada", () => {
    const initState = {
      auth: {
        checking: false,
        uid: "123",
        name: "juan",
      },
      calendar: {
        events: [],
        activeEvent: null,
      },
      ui: {
        modalOpen: false,
      },
    };
    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter></AppRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Calendar").exists()).toBe(true);
  });
});
