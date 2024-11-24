'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateDashboardTags() {
  revalidateTag('retrive-dashboard-tipo-aqpc-mensal');
  revalidateTag('retrive-dashboard-tipo-aqpc-recorrencia');
  revalidateTag('retrive-dashboard-valor-compra-mensal');
}
