const operations = require('./operations.js');
const wordlist = require('./wordlist.js');
const header = require('./header.js');



function main()
{
  console.log("\n");
  header.head();                                                                                                /* print the banner */
  operations.Menu();                                                                                            /* print the game menu */
  let option = operations.asking();
  while (option != "1" && option != "2")                                                                        /* checking if the option inputed by the user is valid */
  {
    console.log("Invalid option");                                                                              /* print error message while the user input an invalid option */
    option = operations.asking();
  }
  let attempt;
  if (option == "1")
  {
    console.clear();                                                                                            /* clear the console */
    console.log("Starting ...\n\n");
    header.head();
    let secret = operations.randomWord(wordlist.words);                                                         /* pick the word to guess */
    let hiddenWord = operations.transform(secret);                                                              /* transform the word to stars */
    let loose = true;
    let attemptedLetters = [];
    console.log("\n\nChoose the number of attempt between 3 and 12 (leave empty for default setting): ");
    let attempt = operations.asking();
    if (operations.attemptSettingValidation(attempt) && attempt < secret.length)        /* attempt value is settled to default value if attempt is less than the length of the word */
    {
      console.log("\nThe value of the attempt inputed is less than the length of the mystery word");
    }
    if (operations.attemptSettingValidation(attempt) && attempt > secret.length)        /* attempt value is settled to the current value if it meet the minimum requirement */
    {
      console.log(`\nSetting the number of attempts to ${attempt} ...`);
    }
    else                                                                                /* attempt value is settled to default if the input is null or invalid character */
    {
      console.log("\nSetting the number of attempts to default value ..."); 
      attempt = secret.length;
    }
    console.log(`The mystery word have ${secret.length} letters`);
    for (let i = 0; i < attempt; i++)
    {
      console.log("\nEnter a letter or the word you think: ");
      let input = operations.asking();
      input = input.toLowerCase();
      let valid = true;
      let not_string = true;
      if (input.length > 1)                                                                  /* verifying if the user input a letter or a word */
      {
        not_string = false;
        console.log("\nStrings detected, verifying ...\n");
        if (input === secret)
        {
          loose = false;
          operations.win();
          break;
        }
        else
        {
          break;
        }
      }
      if (operations.invalidInput(input) || operations.validAttempt(input, attemptedLetters)) /* verifiying if the input is a valid character or not already inputed */
      {
        valid = false;
        not_string = true;
        if (operations.validAttempt(input, attemptedLetters))                                 /* print a message if the input is already attempted before */
        {
          console.log(operations.validAttempt(input, attemptedLetters));
        }
        else
        {
          console.log(operations.invalidInput(input));
        }
        i--;
      }
      if (operations.verifyLetter(secret, input) && valid && not_string) /* checking if the letter is in the word, a valid character and not a string */
      {
        console.clear();
        header.head();
        hiddenWord = operations.update(input, secret, hiddenWord);      /* change all stars to the current value of the input if the input match the letter in the word */
        console.log("\n");
        console.log(operations.randomWord(wordlist.congrats));          /* print a random message if there are matching ccharacters */
        console.log(`\nThe mystery word is now looking like ${hiddenWord}`);
        i--;
      }
      console.log(operations.attemptCount(i, attempt));
      attemptedLetters.push(input);
      console.log(operations.error(i, attempt))
      if (!operations.verifyLetter(hiddenWord, "*"))                    /* if there are no stars the player win */
      {
        operations.win();
        loose = false;
        break;
      }
    }
    if (loose)
    {
      operations.gameOver(secret);
    }
  }
  else
  {
    operations.add(wordlist.words);                                     /* add a word in the wordlist */
    main();
  }
}



function hangman()
{
  let play = true;
  while (play)                                                          /* while the player doesn t want to quit the game, the program is still running */
  {
    main();
    console.log("\nGo to menu ? [yes (y) / or press any key to quit]");
    answer = operations.asking();
    play = operations.restart(answer.toLowerCase());
    console.clear();
    if (!play)
    {
      header.head();
      console.log("\nQuitting The game ...\n\n");
    }
  }
}



hangman();



