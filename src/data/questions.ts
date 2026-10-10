import { Question } from '../types/exam';

export const EXAM_DURATION_MINUTES = 30;
export const TOTAL_QUESTIONS = 40;
export const MARKS_PER_CORRECT = 1.0;
export const NEGATIVE_MARK_PER_INCORRECT = 0.5;

export const DEFAULT_SCRIPT_URL_KEY = 'cpr_google_script_url';

export const questions: Question[] = [
  {
    id: 1,
    q: "1. Morbid jealousy is the central theme of which writing?",
    opts: ["a. pride and prejudice", "b. sense and sensibility", "c. Othelo", "d. Tempest"],
    ans: 2,
    explanation: "Shakespeare's tragedy 'Othello' revolves around the fatal and destructive consequences of morbid sexual jealousy, ignited by the cunning villain Iago.",
    category: "Shakespearean Tragedy"
  },
  {
    id: 2,
    q: "2. Which writer is famous for his sense on the stream of consciousness?",
    opts: ["a. Alfred Tennyson", "b. George Barnard Shaw", "c. James Joyce", "d. William Sidney porter"],
    ans: 2,
    explanation: "James Joyce is celebrated as a pioneer of the stream of consciousness literary technique, famously showcased in 'Ulysses' and 'A Portrait of the Artist as a Young Man'.",
    category: "Modernist Literature"
  },
  {
    id: 3,
    q: "3. The famous short story 'The moon and sixpence' is written by?",
    opts: ["a. William Somerset Maugham", "b. Henry fielding", "c. Robert Browning", "d. WH Auden"],
    ans: 0,
    explanation: "'The Moon and Sixpence' is a 1919 novel / work by W. Somerset Maugham, loosely based on the life of French painter Paul Gauguin.",
    category: "20th Century Fiction"
  },
  {
    id: 4,
    q: "4. 'An Essay on Criticism' is a type of following literary works?",
    opts: ["a. Dramatic monologue", "b. Poetry", "c. Essay", "d. Poem"],
    ans: 3,
    explanation: "Despite the word 'Essay' in the title, Alexander Pope's 'An Essay on Criticism' (1711) is written in heroic couplets and is classified as a didactic poem.",
    category: "Neoclassical Poetry"
  },
  {
    id: 5,
    q: "5. Where is 'The Good Earth' mainly set?",
    opts: ["a. North Ireland", "b. Japan", "c. China", "d. Africa"],
    ans: 2,
    explanation: "Pearl S. Buck's Pulitzer Prize-winning novel 'The Good Earth' (1931) is set in a farming village in pre-revolutionary China.",
    category: "American Literature"
  },
  {
    id: 6,
    q: "6. Tom Jones is a ---",
    opts: ["a. Gothic novel", "b. Senecan tragedy", "c. Epistolary novel", "d. Picaresque novel"],
    ans: 3,
    explanation: "Henry Fielding's 'The History of Tom Jones, a Foundling' (1749) is a classic example of a picaresque comic novel following the adventures of a roguish hero.",
    category: "18th Century Novel"
  },
  {
    id: 7,
    q: "7. Which work is considered the first English epistolary novel?",
    opts: ["a. Pamela", "b. Lady Chatterley's Lover", "c. Clarissa", "d. Silas Marner"],
    ans: 0,
    explanation: "Samuel Richardson's 'Pamela; or, Virtue Rewarded' (1740) is widely regarded as the first major epistolary novel (written as a series of letters) in English literature.",
    category: "18th Century Fiction"
  },
  {
    id: 8,
    q: "8. The play 'The Doctor's Dilemma' satirizes the medical profession mainly by showing-",
    opts: [
      "a. Doctors as completely powerless",
      "b. Doctors' vanity, rivalry and questionable practices",
      "c. Hospitals as unnecessary institutions",
      "d. Patients as more knowledgeable than doctors"
    ],
    ans: 1,
    explanation: "George Bernard Shaw's 1906 play 'The Doctor's Dilemma' exposes and satirizes medical vanity, lucrative fads, rivalry, and conflicting moral values among physicians.",
    category: "Drama & Satire"
  },
  {
    id: 9,
    q: "9. In Gulliver's Travels, which land is populated by giants?",
    opts: ["a. Lilliput", "b. Brobdingnag", "c. Laputa", "d. Houyhnhnms"],
    ans: 1,
    explanation: "In Jonathan Swift's 'Gulliver's Travels', Brobdingnag is the land of giant humans (about 60 feet tall), whereas Lilliput is inhabited by tiny people.",
    category: "18th Century Satire"
  },
  {
    id: 10,
    q: "10. Who wrote in the pen name of Currer bell?",
    opts: ["a. Emily Bronte", "b. Jane Austen", "c. T S Eliot", "d. Charlotte Bronte"],
    ans: 3,
    explanation: "Charlotte Brontë adopted the male pen name 'Currer Bell' when publishing 'Jane Eyre'. Her sister Emily wrote under 'Ellis Bell', and Anne under 'Acton Bell'.",
    category: "Victorian Literature"
  },
  {
    id: 11,
    q: "11. Multigenerational jealousy, revenge and destructive love is the central theme of which famous novel?",
    opts: ["a) Mill on the floss", "b) The waste land", "c) Wuthering heights", "d) Brave New World"],
    ans: 2,
    explanation: "Emily Brontë's 'Wuthering Heights' depicts the intense, turbulent, and destructive passions of Heathcliff and Catherine Earnshaw spanning two generations.",
    category: "Victorian Novel"
  },
  {
    id: 12,
    q: "12. Who wrote the famous poem 'Fern Hill'?",
    opts: ["a) Dylan Thomas", "b) Thomas Sackville", "c) Ezra Pound", "d) John Donne"],
    ans: 0,
    explanation: "'Fern Hill' (1945) is a lyrical masterpiece by Welsh poet Dylan Thomas, reminiscing about the idyllic innocence of childhood at his aunt's dairy farm.",
    category: "Modern Poetry"
  },
  {
    id: 13,
    q: "13. Which play takes place in the Forest of Arden?",
    opts: ["a) Romeo and Juliet", "b) As you like it", "c) Waiting for Godot", "d) Measure for measure"],
    ans: 1,
    explanation: "William Shakespeare's pastoral comedy 'As You Like It' is predominantly set in the idyllic and transformative Forest of Arden.",
    category: "Shakespearean Comedy"
  },
  {
    id: 14,
    q: "14. The trumpet of a prophecy! O Wind, If Winter comes, can Spring be far behind?' - Who phrased it?",
    opts: ["a) Robert Browning", "b) W.B. Yeats", "c) P.B. Shelley", "d) John Keats"],
    ans: 2,
    explanation: "This optimistic closing line is from Percy Bysshe Shelley's famous Romantic lyric 'Ode to the West Wind' (1819).",
    category: "Romantic Poetry"
  },
  {
    id: 15,
    q: "15. Who is known as poet and painter?",
    opts: ["a) William Blake", "b) William Wordsworth", "c) W B Yeats", "d) Lord Byron"],
    ans: 0,
    explanation: "William Blake (1757–1827) was both an acclaimed Romantic visionary poet and an accomplished engraver/painter who illustrated his own poetic works.",
    category: "Romantic Era"
  },
  {
    id: 16,
    q: "16. Who is the father of dramatic monologue in English literature?",
    opts: ["a) Emily Dickinson", "b) George Eliot", "c) William Congreve", "d) Robert Browning"],
    ans: 3,
    explanation: "Robert Browning is considered the master and father of the dramatic monologue in English poetry ('My Last Duchess', 'Fra Lippo Lippi', 'Porphyria\'s Lover').",
    category: "Victorian Poetry"
  },
  {
    id: 17,
    q: "17. 'For God's sake, hold your tongue, and let me love.' This quotation is taken from -",
    opts: ["a) The Flea", "b) The Canonization", "c) The Good Morrow", "d) A Valediction: Forbidding Mourning"],
    ans: 1,
    explanation: "This famous opening line is from John Donne's metaphysical love poem 'The Canonization' (1633).",
    category: "Metaphysical Poetry"
  },
  {
    id: 18,
    q: "18. 'Beauty is truth, truth beauty,' is a famous quotation from -",
    opts: ["a) Ode on a Grecian Urn", "b) Ode on Melancholy", "c) Lamia", "d) Ode to Autumn"],
    ans: 0,
    explanation: "'Beauty is truth, truth beauty, — that is all / Ye know on earth, and all ye need to know' concludes John Keats's 'Ode on a Grecian Urn' (1819).",
    category: "Romantic Poetry"
  },
  {
    id: 19,
    q: "19. 'Our sweetest songs are those that tell of saddest thought' belongs to which literary genres?",
    opts: ["a) Conceit", "b) Paraphrase", "c) Circumlocution", "d) Epigram"],
    ans: 3,
    explanation: "This celebrated line from Shelley's 'To a Skylark' is an Epigram — a pithy, concise, witty, and paradoxical statement expressing a memorable truth.",
    category: "Literary Devices"
  },
  {
    id: 20,
    q: "20. What is the tenure of Victorian Period?",
    opts: ["a. 1660-1700", "b. 1832-1901", "c. 1798-1932", "d. 1558-1603"],
    ans: 1,
    explanation: "The Victorian era of English literature spans from 1832 (passage of the First Reform Bill) or 1837 (Queen Victoria's coronation) until her death in 1901.",
    category: "Literary Periods"
  },
  {
    id: 21,
    q: "21. Sonnets written by Edmund Spenser is known as?",
    opts: ["a) Epithalamion", "b) Lamia", "c) Amoretti", "d) The Shepherds calendar"],
    ans: 2,
    explanation: "Edmund Spenser's 89 sonnet sequence written to his second wife Elizabeth Boyle is titled 'Amoretti' (meaning 'Little Loves' in Italian).",
    category: "Elizabethan Poetry"
  },
  {
    id: 22,
    q: "22. Who translated the work known as The Field of Embroidered Quilt?",
    opts: ["a) Jashim Uddin", "b) Edward Fitzgerald", "c) Robert Herrick", "d) E M Milford"],
    ans: 3,
    explanation: "Jasimuddin's Bengali pastoral narrative masterpiece 'Nakshi Kanthar Math' was translated into English as 'The Field of the Embroidered Quilt' by E. M. Milford in 1939.",
    category: "Bengali Literature in Translation"
  },
  {
    id: 23,
    q: "23. In 'The Gift of the Magi', what does Della sell to buy a Christmas gift for Jim?",
    opts: ["a) Her long hair", "b) Her gold watch", "c) Her wedding ring", "d) Her apartment furniture"],
    ans: 0,
    explanation: "In O. Henry's ironic short story 'The Gift of the Magi', Della cuts and sells her beautiful long hair to buy a platinum fob chain for Jim's heirloom watch.",
    category: "American Short Story"
  },
  {
    id: 24,
    q: "24. Who is the first lexicographer of English Literature?",
    opts: ["a) Samuel Richardson", "b) Francis Bacon", "c) Samuel Johnson", "d) John Wycliffe"],
    ans: 2,
    explanation: "Dr. Samuel Johnson compiled and published 'A Dictionary of the English Language' in 1755, making him the landmark first comprehensive lexicographer in English.",
    category: "18th Century Literature"
  },
  {
    id: 25,
    q: "25. Who is the author of Brick lane?",
    opts: ["a) Monica Ali", "b) Anita Deshai", "c) Chinua Achebe", "d) Ted Hughes"],
    ans: 0,
    explanation: "'Brick Lane' (2003) is the acclaimed debut novel by British-Bangladeshi author Monica Ali, following Nazneen's life in London's East End.",
    category: "Contemporary Commonwealth"
  },
  {
    id: 26,
    q: "26. The line 'Fools rush in where angels fear to tread' is taken from-",
    opts: ["a. An Essay on Criticism", "b. An Essay on Man", "c. The Rape of the Lock", "d. The Dunciad"],
    ans: 0,
    explanation: "This famous proverb originated in Alexander Pope's philosophical didactic poem 'An Essay on Criticism' (Part III, line 625).",
    category: "Neoclassical Quotes"
  },
  {
    id: 27,
    q: "27. Who is the most ill-fated character in 'Riders to the Sea'?",
    opts: ["a) Bartley", "b) Cathleen", "c) Maurya", "d) Nora"],
    ans: 2,
    explanation: "In J. M. Synge's one-act Irish tragedy 'Riders to the Sea', Maurya is the grieving mother who loses her husband, father-in-law, and all six sons to the merciless ocean.",
    category: "Irish Literary Revival"
  },
  {
    id: 28,
    q: "28. Who wrote the poem 'The Love Song of J. Alfred Prufrock'?",
    opts: ["a) P. B Shelley", "b) T. S Eliot", "c) Edmund Spenser", "d) William Wordsworth"],
    ans: 1,
    explanation: "'The Love Song of J. Alfred Prufrock' (1915) was written by T. S. Eliot and represents a landmark turning point in modern Anglo-American poetry.",
    category: "Modernist Poetry"
  },
  {
    id: 29,
    q: "29. Call me Ishmael.' is the famous opening line of which novel?",
    opts: ["a) Riders to the sea", "b) Oroonko", "c) Moby-Dick", "d) Sailing to Byzantine"],
    ans: 2,
    explanation: "'Call me Ishmael.' is arguably the most famous opening sentence in world literature, beginning Herman Melville's 1851 novel 'Moby-Dick'.",
    category: "American Literature"
  },
  {
    id: 30,
    q: "30. Who is the captain in the famous elegy 'O Captain, My Captain'?",
    opts: ["a) Abraham Lincoln", "b) George Washington", "c) Theodore Roosevelt", "d) Harry S Truman"],
    ans: 0,
    explanation: "Walt Whitman composed the sorrowful elegy 'O Captain! My Captain!' in 1865 to mourn the assassination of US President Abraham Lincoln.",
    category: "American Poetry"
  },
  {
    id: 31,
    q: "31. Who is the national poet of Ireland?",
    opts: ["a) Walt Whitman", "b) Lord Byron", "c) John Millington Synge", "d) William Butler Yeats"],
    ans: 3,
    explanation: "William Butler Yeats (1865–1939) is revered as the national poet of Ireland, leader of the Irish Literary Revival, and Nobel laureate (1923).",
    category: "Irish Literature"
  },
  {
    id: 32,
    q: "32. Find the odd one?",
    opts: ["a) The Lotos eaters", "b) Rime of an ancient mariner", "c) The solitary reaper", "d) Ozymandias"],
    ans: 0,
    explanation: "'The Lotos-Eaters' was written by Victorian poet Alfred Tennyson, whereas the other three ('Rime of the Ancient Mariner' - Coleridge, 'The Solitary Reaper' - Wordsworth, 'Ozymandias' - Shelley) are Romantic period poems.",
    category: "Comparative Periods"
  },
  {
    id: 33,
    q: "33. 'The idea of justice' is written by?",
    opts: ["a) John Locke", "b) Amartya sen", "c) Bertrand Russell", "d) Nicholas Moore"],
    ans: 1,
    explanation: "'The Idea of Justice' (2009) is a major philosophical critique of social choice and political philosophy authored by Nobel Laureate Amartya Sen.",
    category: "Non-Fiction & Philosophy"
  },
  {
    id: 34,
    q: "34. Who is the protagonist of Great Expectations?",
    opts: ["a) David", "b) Pip", "c) Oliver", "d) Sydney"],
    ans: 1,
    explanation: "Pip (Philip Pirrip) is the protagonist and first-person narrator of Charles Dickens's classic 1861 novel 'Great Expectations'.",
    category: "Victorian Fiction"
  },
  {
    id: 35,
    q: "35. In drama, a 'Soliloquy' refers to -",
    opts: [
      "a. A speech made by a character alone to express thoughts",
      "b. The dreadful consequence of the story of a tragedy",
      "c. A lyric poem or songs in praise of God",
      "d. A lower kind of poem on a trivial subject"
    ],
    ans: 0,
    explanation: "A soliloquy is a dramatic literary device where a character speaks their innermost thoughts and feelings aloud while alone on stage.",
    category: "Drama Terms"
  },
  {
    id: 36,
    q: "36. The main theme of which work is 'to justify the ways of God to man'?",
    opts: ["a) Paradise regained", "b) The Iliad", "c) The Odyssey", "d) Paradise lost"],
    ans: 3,
    explanation: "In Book I of John Milton's epic poem 'Paradise Lost' (1667), the stated purpose is to 'assert Eternal Providence, / And justify the ways of God to men.'",
    category: "Epic Poetry"
  },
  {
    id: 37,
    q: "37. 'Snowball' is the character of -",
    opts: ["a) Nineteen Eighty-four", "b) The Last Leaf", "c) Animal farm", "d) The Mayor of Casterbridge"],
    ans: 2,
    explanation: "Snowball is the intellectual revolutionary pig in George Orwell's allegorical novella 'Animal Farm' (1945), representing Leon Trotsky.",
    category: "Political Allegory"
  },
  {
    id: 38,
    q: "38. What does tree symbolise in waiting for Godot?",
    opts: [
      "a. Religious salvation",
      "b. Eternal life",
      "c. Both hope and barrenness",
      "d. The passage of time and change"
    ],
    ans: 2,
    explanation: "The solitary willow tree beside the country road in Samuel Beckett's 'Waiting for Godot' embodies existential ambiguity — representing both barren hopelessness and fleeting hope when it sprouts four or five leaves.",
    category: "Theatre of the Absurd"
  },
  {
    id: 39,
    q: "39. Who painted the portrait of the Duchess in 'My Last Duchess'?",
    opts: ["a) Neptune", "b) Fra Pandolf", "c) Michael Angelo", "d) Rafael"],
    ans: 1,
    explanation: "In Robert Browning's dramatic monologue 'My Last Duchess', the Duke of Ferrara refers to the fictitious monk-painter 'Fra Pandolf by design' who painted the portrait.",
    category: "Victorian Poetry"
  },
  {
    id: 40,
    q: "40. The killing of albatross in The Rime of the Ancient Mariner was indicative of -",
    opts: [
      "a. A trigger-happy Mariner",
      "b. The essential irrationality of man",
      "c. A superstitious Mariner",
      "d. The Mariner as a skillful fowler"
    ],
    ans: 1,
    explanation: "The unmotivated, senseless crossbow shooting of the benign albatross by the ancient mariner symbolizes the inexplicable, irrational, and fallen destructive nature of human beings against God's creation.",
    category: "Romantic Poetry"
  }
];
