import { usePreferencias } from '@/features/preferencias/context/PreferenciasContext';
import { useRecados } from '@/features/recados/context/RecadosContext';
import { ordenarRecados } from '@/features/recados/domain/ordenarRecados';

/** Tudo o que a tela do mural precisa: os recados, já na ordem escolhida, e
 *  o estado da preferência que decide essa ordem. */
export function useMural() {
  const { recados, adicionarRecado, arquivarRecado } = useRecados();
  const { ordem, carregando, erro } = usePreferencias();

  return {
    recados,
    recadosOrdenados: ordenarRecados(recados, ordem),
    carregando,
    erro,
    adicionarRecado,
    arquivarRecado,
  };
}
