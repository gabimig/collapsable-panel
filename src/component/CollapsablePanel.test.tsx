import React from 'react'
import { render } from '@testing-library/react';
import CollapsablePanel from './CollapsablePanel'
import PowerIcon from '@material-ui/icons/Power'
import '@testing-library/jest-dom'


test('ContentPanel - Renders without crashing', ()=>{
  const { getByTestId } = render(<CollapsablePanel
    title="title"
    iconComponent={PowerIcon}
  >
    <div></div>
  </CollapsablePanel>)
  const label = getByTestId('main-container')
  expect(label).toBeInTheDocument()
})

