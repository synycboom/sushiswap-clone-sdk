import { Currency } from '../Currency'
import { NativeCurrency } from '../NativeCurrency'
import { Token } from '../Token'
import { WNATIVE } from '../../constants/tokens'
import invariant from 'tiny-invariant'

export class Godwoken extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'CKB', 'Nervos Network')
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId]
    invariant(!!wnative, 'WRAPPED')
    return wnative
  }

  private static _cache: { [chainId: number]: Godwoken } = {}

  public static onChain(chainId: number): Godwoken {
    return this._cache[chainId] ?? (this._cache[chainId] = new Godwoken(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
