import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';

import { fetchAllApplicationsStart } from '../../redux/application/application.actions';
import { selectApplications } from '../../redux/application/application.selectors';

function AdminPanel({ fetchApplications, applications }) {
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  function acceptApplication() {
    
  }

  function declineApplication() {

  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Adresse</TableCell>
            <TableCell>Fødselsdato</TableCell>
            <TableCell>Uddannelse</TableCell>
            <TableCell>Erfaring</TableCell>
            <TableCell>Grunde</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map(application => (
            <TableRow key={application.id}>
              <TableCell component='th' scope='row'>
                {application.address + ' ' + application.city}
              </TableCell>
              <TableCell>
                {new Date(application.birthDate.seconds * 1000).toLocaleDateString(
                  'da-DK'
                )}
              </TableCell>
              <TableCell>{application.educationBackground}</TableCell>
              <TableCell>{application.previousExperience}</TableCell>
              <TableCell rowSpan={2}>{application.reasons}</TableCell>
              <TableCell>
                <IconButton size='small'>
                  <CheckIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton size='small'>
                  <BlockIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

const mapStateToProps = createStructuredSelector({
  applications: selectApplications,
});

const mapDispatchToProps = dispatch => ({
  fetchApplications: () => dispatch(fetchAllApplicationsStart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
