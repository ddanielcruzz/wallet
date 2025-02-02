import { useState } from 'react';

import { Box, Stack, Text, color } from '@stacks/ui';

import { BtcFeeType } from '@shared/models/fees/bitcoin-fees.model';
import { Money } from '@shared/models/money.model';

import { formatMoney } from '@app/common/money/format-money';
import { AvailableBalance } from '@app/components/available-balance';
import { OnChooseFeeArgs } from '@app/components/bitcoin-fees-list/bitcoin-fees-list';
import { BitcoinCustomFee } from '@app/features/bitcoin-choose-fee/bitcoin-custom-fee/bitcoin-custom-fee';
import { useNativeSegwitBalance } from '@app/query/bitcoin/balance/bitcoin-balances.query';
import { useCurrentAccountNativeSegwitIndexZeroSigner } from '@app/store/accounts/blockchain/bitcoin/native-segwit-account.hooks';

import { BitcoinChooseFeeLayout } from './components/bitcoin-choose-fee.layout';
import { ChooseFeeSubtitle } from './components/choose-fee-subtitle';
import { ChooseFeeTabs } from './components/choose-fee-tabs';
import { InsufficientBalanceError } from './components/insufficient-balance-error';

interface BitcoinChooseFeeProps {
  amount: Money;
  feesList: React.JSX.Element;
  isLoading: boolean;
  isSendingMax: boolean;
  onChooseFee({ feeRate, feeValue, time }: OnChooseFeeArgs): Promise<void>;
  onSetSelectedFeeType(value: BtcFeeType | null): void;
  onValidateBitcoinSpend(value: number): boolean;
  recipient: string;
  recommendedFeeRate: string;
  showError: boolean;
}
export function BitcoinChooseFee({
  amount,
  feesList,
  isLoading,
  isSendingMax,
  onChooseFee,
  onSetSelectedFeeType,
  onValidateBitcoinSpend,
  recipient,
  recommendedFeeRate,
  showError,
}: BitcoinChooseFeeProps) {
  const nativeSegwitSigner = useCurrentAccountNativeSegwitIndexZeroSigner();
  const btcBalance = useNativeSegwitBalance(nativeSegwitSigner.address);
  const hasAmount = amount.amount.isGreaterThan(0);
  const [customFeeInitialValue, setCustomFeeInitialValue] = useState(recommendedFeeRate);

  return (
    <BitcoinChooseFeeLayout isLoading={isLoading}>
      <Stack alignItems="center" spacing="base" width="100%">
        {hasAmount ? (
          <Text color={showError ? color('feedback-error') : 'unset'} fontSize={6} fontWeight={500}>
            {formatMoney(amount)}
          </Text>
        ) : null}
        {showError ? (
          <InsufficientBalanceError pb={hasAmount ? '0px' : '16px'} />
        ) : (
          <ChooseFeeSubtitle isSendingMax={isSendingMax} />
        )}
        <ChooseFeeTabs
          customFee={
            <BitcoinCustomFee
              amount={amount.amount.toNumber()}
              customFeeInitialValue={customFeeInitialValue}
              hasInsufficientBalanceError={showError}
              isSendingMax={isSendingMax}
              onChooseFee={onChooseFee}
              onSetSelectedFeeType={onSetSelectedFeeType}
              onValidateBitcoinSpend={onValidateBitcoinSpend}
              recipient={recipient}
              setCustomFeeInitialValue={setCustomFeeInitialValue}
            />
          }
          feesList={feesList}
        />
        <Box mt="loose" width="100%">
          <AvailableBalance balance={btcBalance.balance} />
        </Box>
      </Stack>
    </BitcoinChooseFeeLayout>
  );
}
