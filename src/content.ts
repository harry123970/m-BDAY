/**
 * PERSONAL CONTENT FILE
 * Replace the sample text and photo paths here. The rest of the website is already built.
 * Put photo files inside public/photos/ and refer to them as "/photos/filename.jpg".
 */

export const content = {
  nickname: 'My Mahotarma',
  birthdayLine: 'A tiny universe, made only for you.',
  intro: 'Aaj ki raat, yeh chhota sa garden sirf apka hai.',
  openingNote: 'Meri Mahotarma, kuch baatein screen par likhne ke liye nahi—mehsoos karne ke liye hoti hain. Phir bhi, aaj maine apne dil ka ek chhota sa kona apke liye saja diya hai.',
  roseSectionTitle: 'A few things I adore about you',
  roseWishes: [
    'Subha uthte hi "good morning betu" bolna.',
    'Meri choti choti khusiyo ko bhut badi khusiya bana dena.',
    'Apne piyare haton se khilana.',
    'kahi bhi baith te hai to sath pair me pair dalke baithna.',
    'Apne aap ko pura free chord dena , aur chote baccho jaise baithe ke mere haton se khana.',
    'Apna had mood shwings ko khulke express karna.',
  ],
  jarTitle: 'A little jar of us',
  jarHint: 'Tap the jar to pick a little note.',
  jarNotes: [
    'Agar aaj aap muskura rahe ho, toh meri taraf se aur thoda muskura lo.',
    'I labbuuuuuuuuuuu❤️.',
    'Apko har baar perfect hone ki zaroorat nahi. Aap already special ho.',
    'Ek chhota sa reminder: Mai apka hun.',
    'Aap hamesha khus rha karo yaar bas...itna hi dua hai',
    'I am a page in your book, but you are the whole library to me2',
  ],
  letterTitle: 'A letter from my heart',
  letter: 'Happy Birthday,Mahotarma. ♥\n Mera baccha...Mor Nini.....Meri paglet...Mari Biwi...\n\nAap meri zindagi ka woh hissa ho jise main jaldi mein nahi, poore dil se sambhaalna chahta hoon. Main chahta hoon ki aap apne aap ko pyaar, izzat aur sukoon ke saath mehsoos karo—not just today, but har rk din , har ek lamha....\n\nThanku for being you, being mine and being baccha, and also thanku for the every little things, and for the moments that we spend together.\n\nHan mai manta hu ki mai perfect nhi hu , but still hamesha apke liye kuch better karna chahta hu , kuch aisa jisse apki jindagi me khusiya badhti hi rhe, Rona ho , chidna ,ho , Gussa karna ho , chahe jo karna ho..in sab ke liye mai hu baba apke pass. I am always here for u my baccha\n\nMeri yahi dua hai ki ye saal apka the best saal ho, Hamesha mere sath raho aur bas muskurate rho.. Aur mere saas sasur bhi hamesha khus rhe...mera sala bhi....usko kaise bhul sakta hun\n\nApka bhondhu ♥',
  finalTitle: 'One last wish',
  finalMessage: 'Khuda apki taqdeer mein woh tamaam khushiyan likh de, Jinki khwahish aapne kabhi khamoshi se ki ho. Aapki har dua kubool ho, Aur aap hamesha meri raho   ... Happy Birthday, Mera Bacchaa. ♥',
  photos: [
    { src: '/photos/IMG-20260211-WA0052.jpg', caption: 'Ek pyaara sa moment ♥' },
    { src: '/photos/IMG_20260801_102223.jpg', caption: 'Har lamha tumhare saath…' },
    { src: '/photos/Snapchat-1965638963.jpg', caption: 'A little moment worth keeping.' },
  ],
  musicSrc: '/music/love-you-still.mp3',
  musicTitle: 'Love You Still (abcdefu)',
  musicArtist: 'Tyler Shaw',
  musicLabel: 'Love You Still ♥',
}

export type PhotoItem = (typeof content.photos)[number]
