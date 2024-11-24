import { useState } from 'react';

import {
  ChefHat,
  ChevronDown,
  ChevronUp,
  HandPlatter,
  OctagonAlert,
  Pencil,
  TriangleAlert,
} from 'lucide-react';

import { Cardapio } from '@/entities/cardapio';
import { Preparo } from '@/entities/preparo';
import { Card } from '@/shared/ui/components/card';
import { Tooltip } from '@/shared/ui/components/tooltip';
import { getDateInfo } from '@/shared/utils/date-methods';
import { ButtonCreate } from '@/widgets/buttons/button-create';

import { ModalCardapio } from '../../modal-cardapio';

type TCardCardapioProps = {
  cardapio: Cardapio;
  preparos: Preparo[];
};

type TCardapioPreparoButtonProps = {
  preparo: Preparo;
};

type TPreparoIconProps = {
  hasIsSaudavel: boolean;
  hasIsNotSaudavel: boolean;
};

function PreparoIcon({ hasIsSaudavel, hasIsNotSaudavel }: Readonly<TPreparoIconProps>) {
  if (hasIsSaudavel && hasIsNotSaudavel) {
    return <TriangleAlert size={18} className='text-feedback-warning-dark basis-1/6' />;
  }

  if (hasIsNotSaudavel) {
    return <OctagonAlert size={18} className='text-feedback-danger-dark basis-1/6' />;
  }

  if (hasIsSaudavel) {
    return <ChefHat size={18} className='text-feedback-success-dark basis-1/6' />;
  }

  return <></>;
}

function CardapioPreparoButton({ preparo }: Readonly<TCardapioPreparoButtonProps>) {
  const [showTooltipTiposAQPC, setShowTooltipTiposAQPC] = useState<boolean>(false);

  return (
    <button
      aria-label={`Mostrar Tipos AQPC para ${preparo.nome}`}
      onMouseEnter={() => setShowTooltipTiposAQPC(true)}
      onMouseLeave={() => setShowTooltipTiposAQPC(false)}
      className='relative cursor-default flex justify-between items-center rounded-lg hover:bg-functional-soft-darkest p-1'
    >
      <p className='capitalize text-start'>{preparo.nome}</p>
      <PreparoIcon
        hasIsSaudavel={preparo.tiposAQPC.some((tipoAqpc) => tipoAqpc.isSaudavel)}
        hasIsNotSaudavel={preparo.tiposAQPC.some((tipoAqpc) => !tipoAqpc.isSaudavel)}
      />

      {showTooltipTiposAQPC && (
        <div className='animate-flip-down animate-duration-300 absolute top-[40px] rounded-xl bg-functional-soft-dark shadow z-10 p-4 w-full text-start'>
          {preparo.tiposAQPC.map((tipo) => (
            <div key={tipo.id} className='flex gap-2 items-center'>
              {tipo.isSaudavel ? (
                <ChevronUp size={16} className='text-feedback-success-dark basis-1/6' />
              ) : (
                <ChevronDown size={16} className='text-feedback-danger-dark basis-1/6' />
              )}
              <p className='text-xs basis-5/6'>{tipo.nome}</p>
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

export function CardCardapio({ cardapio, preparos }: Readonly<TCardCardapioProps>) {
  const { weekDayName, formattedDate } = getDateInfo(cardapio.data);
  const [showTooltipRecomendado, setShowTooltipRecomendado] = useState(false);
  const [showTooltipControlado, setShowTooltipControlado] = useState(false);

  let alertColorRecomendado = 'text-feedback-success-dark';

  if (cardapio.tipoAQPCAlertas.avisoAlimentoRecomendado) {
    alertColorRecomendado = 'text-feedback-danger-dark';
  } else if (!cardapio.tipoAQPCAlertas.percentualRecomendadoAtual) {
    alertColorRecomendado = 'text-functional-heavy-medium';
  }

  let alertColorControlado = 'text-feedback-success-dark';

  if (cardapio.tipoAQPCAlertas.avisoAlimentoControlado) {
    alertColorControlado = 'text-feedback-danger-dark';
  } else if (!cardapio.tipoAQPCAlertas.percentualControladoAtual) {
    alertColorControlado = 'text-functional-heavy-medium';
  }

  return (
    <Card className='relative transition-all duration-500 hover:scale-[1.01] hover:bg-functional-soft-medium flex flex-col justify-start items-center gap-4 mx-4 lg:mx-0 h-full min-h-60 lg:min-h-80'>
      <HandPlatter
        size={20}
        aria-label='Alerta de percentual recomendado'
        className={`absolute top-4 left-8 ${alertColorRecomendado}`}
        onMouseEnter={() => setShowTooltipRecomendado(true)}
        onMouseLeave={() => setShowTooltipRecomendado(false)}
      />
      {showTooltipRecomendado && (
        <Tooltip>
          Percentual recomendado atual:{' '}
          {(cardapio.tipoAQPCAlertas.percentualRecomendadoAtual * 100).toFixed(2)}%
        </Tooltip>
      )}

      <TriangleAlert
        size={20}
        aria-label='Alerta de percentual controlado'
        className={`absolute top-4 left-14 ${alertColorControlado}`}
        onMouseEnter={() => setShowTooltipControlado(true)}
        onMouseLeave={() => setShowTooltipControlado(false)}
      />
      {showTooltipControlado && (
        <Tooltip>
          Percentual controlado atual:{' '}
          {(cardapio.tipoAQPCAlertas.percentualControladoAtual * 100).toFixed(2)}%
        </Tooltip>
      )}

      {cardapio.preparos.length > 0 && (
        <ModalCardapio
          cardapio={cardapio}
          preparos={preparos}
          triggerButton={
            <button className='absolute top-4 right-4'>
              <Pencil
                className='transition-colors duration-300 text-functional-heavy-medium hover:text-brand-primary-darkest'
                size={20}
              />
            </button>
          }
        />
      )}

      <div className='text-center'>
        <h2 className='capitalize font-semibold'>{weekDayName}</h2>
        <p className='relative'>{formattedDate}</p>
      </div>

      <div className='h-0 w-2/3 border border-functional-soft-darkest'></div>

      <div className='w-3/4 h-full flex flex-col'>
        {cardapio.preparos.length > 0 ? (
          cardapio.preparos.map((preparo) => (
            <CardapioPreparoButton key={`${cardapio.date} - ${preparo.id}`} preparo={preparo} />
          ))
        ) : (
          <div className='flex h-full mb-6 flex-col justify-center items-center'>
            <ModalCardapio
              cardapio={cardapio}
              preparos={preparos}
              triggerButton={<ButtonCreate btnStyle='light' text='' />}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
