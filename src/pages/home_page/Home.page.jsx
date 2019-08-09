import React from 'react';
import EditableText from '../../components/editable_text/EditableText.component';
import Container from '@material-ui/core/Container';

function Home() {
  const [text, setText] = React.useState('Hello What can I do for you?');

  return (
    <Container maxWidth='xl'>
      <EditableText id='test' tooltipTitle='Test' variant='h1' multiline={true} onChange={event => setText(event.target.value)} value={text} />
    </Container>
  );
}

export default Home;
