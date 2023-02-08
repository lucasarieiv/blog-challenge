import { SliceSimulator } from '@prismicio/slice-simulator-react';
import { SliceComponentProps, SliceZone } from '@prismicio/react';

import state from '../../.slicemachine/libraries-state.json';
import { components } from '../../slices/index.js';

const SliceSimulatorPage = (): any => (
  <SliceSimulator
    // The "sliceZone" prop should be a function receiving slices and rendering them using your "SliceZone" component.
    sliceZone={props => <SliceZone {...props} components={components} />}
    state={state}
  />
);

export default SliceSimulatorPage;
