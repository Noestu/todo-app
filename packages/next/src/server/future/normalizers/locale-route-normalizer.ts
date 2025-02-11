import { I18NProvider } from '../helpers/i18n-provider'
import { Normalizer } from './normalizer'

/**
 * Normalizes the pathname by removing the locale prefix if any.
 */
export class LocaleRouteNormalizer implements Normalizer {
  constructor(private readonly provider: I18NProvider) {}

  /**
   * Normalizes the pathname by removing the locale prefix if any.
   *
   * @param pathname The pathname to normalize.
   * @returns The pathname without the locale prefix (if any).
   */
  public normalize(pathname: string): string {
    const match = this.provider.analyze(pathname, {
      // We aren't using the detected locale, so we can pass `undefined` because
      // we don't need to infer the default locale.
      defaultLocale: undefined,
    })

    return match.pathname
  }
}
