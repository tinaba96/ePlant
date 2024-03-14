import React from 'react'
import { useParams } from 'react-router-dom'

import { viewDataStorage, viewStateStorage } from '@eplant/View/viewData'
import { BugReportOutlined } from '@mui/icons-material'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import { View } from '../../View'

type DebugViewState = {
  testToggle: boolean
}

type DebugViewAction = { type: 'test-toggle' }

const DebugView: View<null, DebugViewState, DebugViewAction> = {
  name: 'Debug view',
  getInitialState: () => ({
    testToggle: false,
  }),
  component: (props) => {
    const {viewId, geneId} = useParams()
    return (
      <div>
        <Typography variant='h6'>
          Debug view for {props.geneticElement?.id}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Toggle value</TableCell>
              <TableCell>{props.state.testToggle ? 'true' : 'false'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>View ID</TableCell>
              <TableCell>{viewId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gene ID</TableCell>
              <TableCell>{geneId}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          onClick={() => {
            viewStateStorage.clear()
            viewDataStorage.clear()
          }}
        >
          Wipe view data
        </Button>
      </div>
    )
  },
  getInitialData: async () => null,
  reducer: (state, action) => {
    switch (action.type) {
      case 'test-toggle':
        return {
          ...state,
          testToggle: !state.testToggle,
        }
      default:
        return state
    }
  },
  actions: [
    {
      action: { type: 'test-toggle' },
      render(props) {
        return <>{props.state.testToggle ? 'Turn off' : 'Turn on'}</>
      },
    },
  ],
  id: 'debug-view',
  icon: () => <BugReportOutlined />,
}

export default DebugView
