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

import {
  fetchAllApplicationsStart,
  acceptApplicationStart,
  declineApplicationStart,
} from '../../redux/application/application.actions';
import { selectApplications } from '../../redux/application/application.selectors';

function AdminPanel({
  fetchApplications,
  applications,
  acceptApplication,
  declineApplication,
}) {
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  function onAcceptApplication(applicationId) {
    acceptApplication(applicationId);
  }

  function onDeclineApplication(applicationId) {
    declineApplication(applicationId);
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
            <TableCell>Godkend</TableCell>
            <TableCell>Afvis</TableCell>
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
                <IconButton
                  size='small'
                  onClick={() => onAcceptApplication(application.id)}>
                  <CheckIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  size='small'
                  onClick={() => onDeclineApplication(application.id)}>
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
  acceptApplication: applicationId => dispatch(acceptApplicationStart({ applicationId })),
  declineApplication: applicationId =>
    dispatch(declineApplicationStart({ applicationId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
