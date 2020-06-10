import React, { Component } from "react";
import {
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import templates from "./SavedNotifications";
import axios from "axios";
import PageAlert from "./Alert";
class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: templates["appUpdate"].title,
      body: templates["appUpdate"].body,
      token: templates["defaultToken"],
      action: "appUpdate",
      alerts: [],
    };
  }
  textChangeHandler = (event, key) => {
    let copy = { ...this.state };
    let data = event.target.value;
    copy[key] = data;
    this.setState(copy);
  };
  selectChangeHandler = (event) => {
    let copy = { ...this.state };
    let data = event.target.value;
    copy["action"] = data;
    copy["title"] = templates[data].title;
    copy["body"] = templates[data].body;
    this.setState(copy);
  };
  submitHandler = () => {
    let { alerts, ...notification } = this.state;
    const copy = { ...this.state };
    copy.alerts = [];
    axios
      .post(" http://localhost:5000/notify/", notification)
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          copy.alerts.push({
            color: "success",
            message: "Notification successfully sent",
            mId: res.data.data[0],
          });
        } else {
          copy.alerts.push({
            color: "danger",
            message: "Something went wrong with firebase",
            mId: res.data.data[0].message,
          });
        }
        this.setState(copy);
      })
      .catch((err) => {
        copy.alerts.push({
          color: "danger",
          message: "Cannot contact server",
          mId: err,
        });
        this.setState(copy);
      });
  };
  render() {
    let options = null;
    let alertMessages = null;
    options = templates.options.map((op) => {
      return (
        <option value={op} key={op}>
          {op
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, function (str) {
              return str.toUpperCase();
            })
            .trim()}
        </option>
      );
    });
    alertMessages = this.state.alerts.map((alert) => {
      return (
        <PageAlert
          text={alert.message}
          color={alert.color}
          info={alert.mId}
          key={alert.message}
        />
      );
    });
    return (
      <Card>
        <CardBody>
          {alertMessages}
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={this.state.title}
                placeholder="Enter a title"
                onChange={(e) => this.textChangeHandler(e, "title")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="body">Body</Label>
              <Input
                type="text"
                name="body"
                id="body"
                value={this.state.body}
                placeholder="Notification Body"
                onChange={(e) => this.textChangeHandler(e, "body")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="token">Token</Label>
              <Input
                type="text"
                name="token"
                id="token"
                value={this.state.token}
                placeholder="Testing token"
                onChange={(e) => this.textChangeHandler(e, "token")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="action">Select</Label>
              <Input
                type="select"
                name="action"
                id="action"
                value={this.state.action}
                onChange={this.selectChangeHandler}
              >
                {options}
              </Input>
            </FormGroup>
          </Form>
          <Button onClick={this.submitHandler}>Submit</Button>
        </CardBody>
      </Card>
    );
  }
}

export default Notifications;
