import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Segment, Container, Header, Divider, Grid } from "semantic-ui-react";
import Side from "./BasicSideNavBar";

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          position: "absolute",

          left: "50%",

          top: "50%",

          transform: "translate(-50%, -50%)"
        }}
      >
        <Container text>
          <Header as="h1" color="grey">
            LIRTEN HUB
          </Header>
          <Divider inverted />

          <p>
            Technology is reforming the way work gets done so radically that all
            business domains are changing. All aspects of the professional work
            environment is rapidly evolving from workflow, processes and the
            very structure of organizations. Startups, with their creative
            ability to innovate, are competing and defeating major enterprises.
            Hence, itʼs no surprise this is called the disruptive era.
          </p>
          <p>
            A considerable number of enterprises are just selling their
            establishment and the facade of a strong grip. Theyʼre charging
            premium because they can, not because of the quality they produce.
            Pair that with the disruption caused by the changing economy, one
            can understand why enterprises are trying to change they way they
            operate. The are trying their best to attract talent as their need
            for innovative talent is higher than ever.
          </p>

          <p>
            Workforce, expertise, infrastructure and management. The idea is to
            dynamically and on demand assign, consult, allocate and oversee a
            required task throughout itʼs execution. The entity with a task, a
            well-suited candidate for the task and finally the consultancy.
            Consultancies will allow companies to be sure that their tasks will
            be fulfilled. Also, will help people choose the right tasks that
            they can perform given their abilities. Because in Lirten we believe
            that motivation and talent run supreme.
          </p>
          <p>
            Our vision is to give a chance to those who wish to contribute but
            are not given a chance, to empower and teach those who want to
            better their futures and finally to solve the mess of the
            freelancing world.
          </p>
          <p>
            Hence, the idea of our platform could be viewed as a way to change
            how work gets done.
          </p>
        </Container>
      </div>
    );
  }
}

export default About;
