import React from 'react'
import { Icon, Step } from 'semantic-ui-react'

const StepExampleOrdered = () => (
  <Step.Group ordered>
    <Step>
   
      <Step.Content>
      <Icon name="download" />
        <Step.Title>Posted</Step.Title>
        <Step.Description>your task has been approved </Step.Description>
      </Step.Content>
    </Step>

    <Step>
      <Step.Content>
      <Icon name="envelope" />
        <Step.Title>Assigned</Step.Title>
        <Step.Description>A member has been assigned to your task</Step.Description>
      </Step.Content>
    </Step>

    <Step>
      <Step.Content>
      <Icon name="envelope open" />
        <Step.Title>Started</Step.Title>
        <Step.Description>A member has started working your task</Step.Description>

      </Step.Content>
    </Step>
    <Step>
      <Step.Content>
     
      <Icon name=" thumbs up" />
        <Step.Title>finished</Step.Title>
        <Step.Description>your task is completed</Step.Description>

      </Step.Content>
    </Step>
  </Step.Group>
)

export default StepExampleOrdered
