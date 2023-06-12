import * as btc from '@scure/btc-signer';
import { Box, Text } from '@stacks/ui';

import { isUndefined } from '@shared/utils';

import { useOrdinalsAwareUtxoQueries } from '@app/query/bitcoin/ordinals/ordinals-aware-utxo.query';

import { PsbtDecodedNodeLayout } from '../psbt-decoded-node.layout';
import { PsbtPlaceholderNode } from '../psbt-placeholder-node';
import { PsbtUnsignedInputItem } from './components/psbt-unsigned-input-item';

interface PsbtUnsignedInputListProps {
  addressNativeSegwit: string;
  addressTaproot: string;
  inputs: btc.TransactionInputRequired[];
  showPlaceholder: boolean;
}
export function PsbtUnsignedInputList({
  addressNativeSegwit,
  addressTaproot,
  inputs,
  showPlaceholder,
}: PsbtUnsignedInputListProps) {
  const unsignedUtxos = useOrdinalsAwareUtxoQueries(inputs).map(query => query.data);

  return (
    <Box background="white" borderTopLeftRadius="16px" borderTopRightRadius="16px" p="loose">
      <Text fontWeight={500}>Inputs</Text>
      {showPlaceholder ? (
        <PsbtPlaceholderNode />
      ) : (
        unsignedUtxos.map(utxo => {
          if (isUndefined(utxo)) return <PsbtDecodedNodeLayout value="No input data found" />;

          return (
            <PsbtUnsignedInputItem
              addressNativeSegwit={addressNativeSegwit}
              addressTaproot={addressTaproot}
              key={utxo.transaction}
              utxo={utxo}
            />
          );
        })
      )}
    </Box>
  );
}
