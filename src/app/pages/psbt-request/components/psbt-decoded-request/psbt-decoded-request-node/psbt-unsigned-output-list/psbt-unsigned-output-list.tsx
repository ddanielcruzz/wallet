import * as btc from '@scure/btc-signer';
import { Box, Text } from '@stacks/ui';

import { PsbtPlaceholderNode } from '../psbt-placeholder-node';
import { PsbtUnsignedOutputItem } from './components/psbt-unsigned-output-item';

interface PsbtUnsignedOutputListProps {
  addressNativeSegwit: string;
  addressTaproot: string;
  outputs: btc.TransactionOutputRequired[];
  showPlaceholder: boolean;
}
export function PsbtUnsignedOutputList({
  addressNativeSegwit,
  addressTaproot,
  outputs,
  showPlaceholder,
}: PsbtUnsignedOutputListProps) {
  return (
    <Box background="white" borderBottomLeftRadius="16px" borderBottomRightRadius="16px" p="loose">
      <Text fontWeight={500}>Outputs</Text>
      {showPlaceholder ? (
        <PsbtPlaceholderNode />
      ) : (
        outputs.map((output, i) => {
          return (
            <PsbtUnsignedOutputItem
              addressNativeSegwit={addressNativeSegwit}
              addressTaproot={addressTaproot}
              key={i}
              output={output}
            />
          );
        })
      )}
    </Box>
  );
}
