import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import moment from "moment";
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
} from "../../../actions/events";
import { act } from "react-dom/test-utils";
import Swal from "sweetalert2";

jest.mock("../../../actions/events", () => ({
  eventStartUpdate: jest.fn(),
  eventStartAddNew: jest.fn(),
  eventClearActiveEvent: jest.fn(),
}));
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minute(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().minute(0).seconds(0).add(1, "hours");

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: "title",
      notes: "any note",
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: "123",
  },
  ui: {
    modalOpen: true,
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <CalendarModal></CalendarModal>
  </Provider>
);
Storage.prototype.setItem = jest.fn();
describe("Pruebas en CalendarModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("debe de mostrarse correctamente", () => {
    // expect(wrapper.find(".modal").exists()).toBe(true);
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("debe de llamar la accion de actualizar y cerrar el modal", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("no debe actualizar si no hay titulo", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    expect(eventStartUpdate).not.toHaveBeenCalled();
  });

  test("debe de crear un nuevo evento", () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: "123",
      },
      ui: {
        modalOpen: true,
      },
    };
    let store = mockStore(initState);
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal></CalendarModal>
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "pruebas",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: "pruebas",
      notes: "",
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("debe validar las fechas", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "pruebas",
      },
    });

    const hoy = new Date();
    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(hoy);
    });
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "La fecha fin debe ser mayor a la fecha de inicio",
      "error"
    );
  });
});
