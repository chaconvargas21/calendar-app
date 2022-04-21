import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-messages";
import { types } from "../../../types/types";
import { eventSetActive } from "../../../actions/events";
import { act } from "react-dom/test-utils";

jest.mock("../../../actions/events", () => ({
  eventStartLoading: jest.fn(),
  eventSetActive: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  calendar: {
    events: [],
  },
  auth: {
    uid: "123",
  },
  ui: {
    openModal: false,
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen></CalendarScreen>
  </Provider>
);
Storage.prototype.setItem = jest.fn();
describe("Pruebas en CalendarScreen", () => {
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("pruebas con las interacciones del calendario", () => {
    const calendar = wrapper.find("Calendar");

    const calendarMessages = calendar.prop("messages");
    expect(calendarMessages).toEqual(messages);

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiOpenModal,
    });

    calendar.prop("onSelectEvent")({
      title: "title",
    });
    expect(eventSetActive).toHaveBeenCalledWith({
      title: "title",
    });

    act(()=>{
        calendar.prop("onView")("week");
        expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    })
  });
});
