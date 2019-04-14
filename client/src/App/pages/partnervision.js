import React, { Component } from "react";
import PartnerNavbar from "../components/PartnerNavbar";
import PartnerSidenav from "../components/PartnerSidenav";

class partnervision extends Component {
  state = {};
  render() {
    return (
      <div>
        <PartnerNavbar />
        <PartnerSidenav />

        <br />

        <h2>Our Vision</h2>

        <text style={{ textAlign: "right" }}>
          ................Technology is reforming the way work gets done so
          radically that all business domains are changing. All aspects of the
          professional work environment is rapidly evolving from workflow,
          processes and the very .........structure of organ-izations. Startups,
          with their creative ability to innovate, are competing and defeating
          major enterprises. Hence, itʼs no surprise this is called the
          disrup¬tive era. A considerable number of ................enterprises
          are just selling their establishment and the facade of a strong grip.
          Theyʼre charging premium because they can, not because of the quality
          they produce. Pair that with the disruption caused by the
          ..................changing economy, one can understand why enterprises
          are trying to change they way they operate. The are trying their best
          to attract talent as their need for innovative talent is higher than
          ever. The problem ............enterprises are facing is that they are
          unable to attract talent. Enterprises are also facing a hard time
          keeping their talented employees from leaving, specially the young
          change-enthusiasts. The bureaucracy, ...........routine, non-ending
          lists of rules, unfair distribution of revenues and constraints are
          just the tip of the iceberg. In this day and age, the market is
          changing more rapidly than ever, and the talent demand is
          ...............changing even faster. Highly creative people are
          increasingly refusing the traditional ”work as usual” life¬style. This
          talent acquisition crisis that is addressed globally urged the
          enterpris¬es to go further than they have ever went in trying to find
          a solution. Their salvation, they think, is Digital Transformation,
          one of the most trending buzzwords in the business world nowadays.
          Digital Transformation push¬es enterprises in all domains to
          restructure themselves, their hierarchy and work-flow with to
          embracing the agile behavior, creating a more attractive work
          environment for highly talented people. Finally, even in this digital
          age, enterprises are just using a fraction of itʼs full potential.
          Companies are not making use of people available with their minds and
          talents, but not physically. The number of freelancers and digital
          nomads is increasing more than ever. Nevertheless, their presence in
          the traditional work-place to help and aid enterprises is much lower
          than it could be. Worse comes to worst when we notice that there is a
          massive availability of highly-talented, highly-motivated,
          extremely-creative and qualified work force that is neglected.
        </text>

        <p>
          <div
            class="alert alert-secondary"
            role="alert"
            style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          >
            Copyright © 2019 Lirten Inc. All Rights Reserved.
          </div>
        </p>
      </div>
    );
  }
}

export default partnervision;
