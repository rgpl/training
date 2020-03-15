import { EuiToolTip } from '@elastic/eui';
import React from 'react';

import {
  EuiFieldText,
  EuiFormRow,
  EuiSelect,
  EuiPanel,
  EuiIcon,
} from '@elastic/eui';

export default () => (
  <EuiPanel style={{ maxWidth: 300 }}>
    <EuiFormRow
      label="UserName"
      helpText="Show validation help text only."
      display="columnCompressed">
      <EuiFieldText name="first" compressed />
    </EuiFormRow>

    <EuiFormRow
      label={
        <EuiToolTip content="Otherwise use an EuiToolTip around the label of the form row.">
          <span>
            Gender <EuiIcon type="questionInCircle" color="subdued" />
          </span>
        </EuiToolTip>
      }
      display="columnCompressed">
      <EuiSelect
        options={[
          { value: 'option_one', text: 'Male' },
          { value: 'option_two', text: 'Female' },
          { value: 'option_three', text: 'Special Gender' },
        ]}
        compressed
      />
    </EuiFormRow>
  </EuiPanel>
);