import { ElementType, ReactNode } from 'react'
import { cn } from "@/app/lib/utils"
import Image from 'next/image'

type CartVariant = 'elevated' | 'outlined' | 'neutral'
type CartSize = 'sm' | 'md' | 'lg' | 'xl'
type CartTone = 'primary' | 'secondary'

export interface CardProps {
  as?: 'article' | 'aside' | 'section'
  title?: string
  description?: string
  imgSrc?: string
  imgAlt?: string
  imgWidth?: number
  imgHeight?: number
  children?: ReactNode
  imageChildren?: ReactNode
  variant?: CartVariant
  size?: CartSize
  tone?: CartTone
  className?: string
  onClick?: () => void
}


const base =
  'relative isolate rounded-xl overflow-hidden bg-neutral-950/45 transition-all duration-400 ease-in-out font-mono'

const variants: Record<CartVariant, string> = {
  elevated: 'shadow-xl/40 shadow-pink-900 ',
  outlined: 'ring-1 ring-insert ring-pink-950/30 hover:ring-pink-900/60 ',
  neutral:'bg-neutral-950/0 hover:backdrop-blur-md'
}

const sizes: Record<CartSize, string> = {
  sm: 'min-h-[4.4rem] h-[12.2vw] min-w-[4.4rem] w-[12.2vw] p-3 gap-1',
  md: 'min-h-[11.4rem] h-[14.8vw] min-w-[10.8rem] w-[15.3vw] pt-1 pl-1 pr-1',
  lg: 'min-h-[12.4rem] h-[15.2vw] min-w-[17.7rem] w-[22.2vw] p-2 gap-0 sm:gap-4',
  xl: 'min-h-[20.4rem] h-[33.2vw]  xl:h-[21.2vw] w-[62vw] xl:w-[32vw]'
}

const tones: Record<CartTone, string> = {
  primary:
    'opacity-100',
  secondary:
    'opacity-85 hover:opacity-100',
}

export function Cart({
  as = 'article',
  title,
  description,
  imgSrc = '/Survival.jpg',
  imgAlt,
  imgWidth = 1500,
  imgHeight = 1000,
  children,
  imageChildren,
  variant = 'elevated',
  size = 'md',
  tone = 'primary',
  className,
  onClick,
}: CardProps) {
  const Wrapper: ElementType = as
  const hasTitel = !!title
  const hasText =!!description && !!title
  return (
    <Wrapper
      className={cn(base, variants[variant], sizes[size], tones[tone], className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {imgSrc && (
        <figure className={cn('w-full overflow-hidden')} >
          <Image
            src={imgSrc}
            alt={imgAlt || (title ? `Image of ${title}` : 'Card image')}
            width={imgWidth}
            height={imgHeight}
            className={cn(
              'w-full h-58 object-convert',
              hasTitel && 'h-48',
              hasText && 'h-40',
              size === 'sm' && 'w-[7vw] h-[7vw] rounded-full ml-[2vw]',
              size === 'md' && 'h-35 md:h-38 lg:h-39 xl:h-[11vw] ',
              size === 'lg' && 'h-35 sm:h-[15vw] lg:h-[11vw] ',
              size === 'xl' && 'min-h-[20.4rem] h-[33.2vw]  xl:h-[21.2vw]',
              variant === 'outlined' && 'border-b border-inherit'
            )}
            priority={variant === 'elevated'}
          />
           {imageChildren && (
            <div className="absolute inset-0 flex flex-col-reverse p-4 pl-6 text-neutral-500">
              {imageChildren}
            </div>
          )}
        </figure>
      )}
      <div className="flex w-full flex-col">
        {title && (
          <h3
            className={cn(
              'font-semibold tracking-tight flex justify-center mt-1.5',
              size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-sm mt-[1vh]' : 'text-[12px]'
            )}
          >
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-neutral-400">
            {description}
          </p>
        )}
        {children}
      </div>
    </Wrapper>
  )
}