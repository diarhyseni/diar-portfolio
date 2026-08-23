export const VIEW_ALL_PROJECTS_MESSAGE = `Hello,

I would like to request access to view your full project portfolio. I am interested in taking a deeper look at your work and would be happy to sign an NDA (Non-Disclosure Agreement) to keep everything confidential.

Please let me know the next steps.

Thank you.`

export const PREFILL_CONTACT_MESSAGE_EVENT = "prefill-contact-message"

export function prefillContactMessage(message: string) {
  window.dispatchEvent(
    new CustomEvent(PREFILL_CONTACT_MESSAGE_EVENT, { detail: { message } })
  )
}
