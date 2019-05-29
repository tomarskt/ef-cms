import { state } from 'cerebral';

/**
 *
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.applicationContext the application context used for getting the scanner API
 * @param {Function} providers.store the cerebral store used for setting state.path
 */
export const startScanAction = async ({ applicationContext, store }) => {
  store.set(state.isScanning, true);
  const scanner = applicationContext.getScanner();
  await scanner.startScanSession();
};
