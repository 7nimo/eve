import { Event } from '@eve/server/src/router/event';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { EventForm } from './EventForm';


describe("EventForm", () => {
  const mockOnSubmit = jest.fn(({...args}: Event) => {
    return Promise.resolve({...args});
  });

  const dateString = new Date(new Date().setHours(0,0,0,0)).toISOString();

  beforeEach(() => {
    render(<EventForm onSubmit={mockOnSubmit}/>);
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("should display field required/invalid date error when value is empty", async () => {
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(5);
    expect(mockOnSubmit).not.toBeCalled();
  });

  it("should display matching error when email is invalid", async () => {
    fireEvent.input(screen.getByLabelText("title"), { target: { value: "Test Title" }});
    fireEvent.input(screen.getByLabelText("first-name"), { target: { value: "Foo" }});
    fireEvent.input(screen.getByLabelText("last-name"), { target: { value: "Bar" }});
    fireEvent.input(screen.getByLabelText("email"), { target: { value: "test" }});
    fireEvent.input(screen.getByLabelText("event-date"), { target: { value: `${dateString.split('T')[0]}` }});
    fireEvent.input(screen.getByLabelText("details"), { target: { value: "Additional info" }});

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockOnSubmit).not.toBeCalled();
  });

  it("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByLabelText("title"), { target: { value: "Test Title" }});
    fireEvent.input(screen.getByLabelText("first-name"), { target: { value: "Foo" }});
    fireEvent.input(screen.getByLabelText("last-name"), { target: { value: "Bar" }});
    fireEvent.input(screen.getByLabelText("email"), { target: { value: "test@email.com" }});
    fireEvent.input(screen.getByLabelText("event-date"), { target: { value: `${dateString.split('T')[0]}` }});
    fireEvent.input(screen.getByLabelText("details"), { target: { value: "Additional Info" }});
    
    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    
    await waitFor(() =>
      expect(mockOnSubmit).toBeCalledWith({
        title: 'Test Title',
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'test@email.com',
        eventDate: new Date(dateString),
        details: 'Additional Info'
      })
    );

    expect(screen.getByLabelText<HTMLInputElement>("title").value).toBe("");
    expect(screen.getByLabelText<HTMLInputElement>("first-name").value).toBe("");
    expect(screen.getByLabelText<HTMLInputElement>("last-name").value).toBe("");
    expect(screen.getByLabelText<HTMLInputElement>("email").value).toBe("");
    expect(screen.getByLabelText<HTMLInputElement>("event-date").value).toBe("");
    expect(screen.getByLabelText<HTMLInputElement>("details").value).toBe("");
  });
});
