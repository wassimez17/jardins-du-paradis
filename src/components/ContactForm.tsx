import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ContactFormData } from '../types'

const contactSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(1, 'Le téléphone est requis'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data)
    alert('Message envoyé avec succès!')
  }

  return (
    <div className="bg-white/5 border border-[rgba(200,230,202,0.15)] rounded-2xl p-10">
      <h3 className="font-serif text-2xl font-normal text-white mb-6">
        Envoyez-nous un message
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] tracking-[1.5px] uppercase text-green-pale opacity-80 mb-1.5">
              Prénom
            </label>
            <input
              {...register('firstName')}
              type="text"
              placeholder="Votre prénom"
              className="w-full bg-white/8 border border-[rgba(200,230,202,0.2)] rounded-lg text-white px-4 py-3 font-sans text-sm font-light outline-none transition-colors focus:border-green-pale placeholder:text-white/35"
            />
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-[11px] tracking-[1.5px] uppercase text-green-pale opacity-80 mb-1.5">
              Nom
            </label>
            <input
              {...register('lastName')}
              type="text"
              placeholder="Votre nom"
              className="w-full bg-white/8 border border-[rgba(200,230,202,0.2)] rounded-lg text-white px-4 py-3 font-sans text-sm font-light outline-none transition-colors focus:border-green-pale placeholder:text-white/35"
            />
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-[11px] tracking-[1.5px] uppercase text-green-pale opacity-80 mb-1.5">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="votre@email.com"
            className="w-full bg-white/8 border border-[rgba(200,230,202,0.2)] rounded-lg text-white px-4 py-3 font-sans text-sm font-light outline-none transition-colors focus:border-green-pale placeholder:text-white/35"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-[11px] tracking-[1.5px] uppercase text-green-pale opacity-80 mb-1.5">
            Téléphone
          </label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+212 6XX XX XX XX"
            className="w-full bg-white/8 border border-[rgba(200,230,202,0.2)] rounded-lg text-white px-4 py-3 font-sans text-sm font-light outline-none transition-colors focus:border-green-pale placeholder:text-white/35"
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="block text-[11px] tracking-[1.5px] uppercase text-green-pale opacity-80 mb-1.5">
            Message
          </label>
          <textarea
            {...register('message')}
            placeholder="Comment pouvons-nous vous aider ?"
            rows={4}
            className="w-full bg-white/8 border border-[rgba(200,230,202,0.2)] rounded-lg text-white px-4 py-3 font-sans text-sm font-light outline-none transition-colors focus:border-green-pale placeholder:text-white/35 resize-none"
          />
          {errors.message && (
            <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gold-accent text-white border-none rounded-lg font-sans text-xs tracking-[1.5px] uppercase py-3.5 cursor-pointer mt-2 transition-all hover:bg-white hover:text-main-green"
        >
          Envoyer le message
        </button>
      </form>
    </div>
  )
}
