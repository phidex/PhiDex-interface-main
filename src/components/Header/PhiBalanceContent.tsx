import { ChainId, TokenAmount } from '@Phidex/sdk'
import React, { useMemo } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/token-logo.png'
import { PHI } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { useMerkleDistributorContract } from '../../hooks/useContract'
import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
import { useTotalPHIEarned } from '../../state/stake/hooks'
import { useAggregatePHIBalance, useTokenBalance } from '../../state/wallet/hooks'
import { ExternalLink, StyledInternalLink, TYPE, PHITokenAnimated } from '../../theme'
import { computePHICirculation } from '../../utils/computePHICirculation'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function PHIBalanceContent({ setShowPHIBalanceModal }: { setShowPHIBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const PHI = chainId ? PHI[chainId] : undefined

  const total = useAggregatePHIBalance()
  const PHIBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, PHI)
  const PHIToClaim: TokenAmount | undefined = useTotalPHIEarned()

  const totalSupply: TokenAmount | undefined = useTotalSupply(PHI)
  const PHIPrice = useUSDCPrice(PHI)
  const blockTimestamp = useCurrentBlockTimestamp()
  const unclaimedPHI = useTokenBalance(useMerkleDistributorContract()?.address, PHI)
  const circulation: TokenAmount | undefined = useMemo(
    () =>
      blockTimestamp && PHI && chainId === ChainId.MAINNET
        ? computePHICirculation(PHI, blockTimestamp, unclaimedPHI)
        : totalSupply,
    [blockTimestamp, chainId, totalSupply, unclaimedPHI, PHI]
  )

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your PHI Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowPHIBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <PHITokenAnimated width="48px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {total?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">{PHIBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="white">Unclaimed:</TYPE.white>
                  <TYPE.white color="white">
                    {PHIToClaim?.toFixed(4, { groupSeparator: ',' })}{' '}
                    {PHIToClaim && PHIToClaim.greaterThan('0') && (
                      <StyledInternalLink onClick={() => setShowPHIBalanceModal(false)} to="/PHI">
                        (claim)
                      </StyledInternalLink>
                    )}
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">PHI price:</TYPE.white>
              <TYPE.white color="white">${PHIPrice?.toFixed(2) ?? '-'}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">PHI in circulation:</TYPE.white>
              <TYPE.white color="white">{circulation?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            {PHI && PHI.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://Phidex.info/token/${PHI.address}`}>View PHI Analytics</ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
