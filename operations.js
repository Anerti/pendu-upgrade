function win() 
{
    console.log("You Win!");
}



function gameOver(correctAnswer) 
{
  console.log(`You lose! the mystery word was ${correctAnswer}`);
}



function Menu() 
{
  console.log("\n\n=== MENU ===\n" + "1. Play" + "\n" + "2. Add a word in the game" + "\n\n" + "Please, select a valid option");
}



function asking()
{
  const prompt = require('prompt-sync')();
  answer = prompt("");
  return answer;
}



function transform(word) 
{
  return "*".repeat(word.length);
}



function verifyLetter(word, letter) 
{
  return word.includes(letter);
}



function randomWord(list) 
{
  const crypto = require('crypto');
  const randomIndex = crypto.randomInt(0, list.length);
  return list[randomIndex];
}



function update(letter, correctWord, hiddenWord) 
{
  let newHiddenWord = "";
  for (let i = 0; i < correctWord.length; i++) 
  {
    if (correctWord[i] === letter) 
    {
      newHiddenWord += letter;
    } 
    else 
    {
      newHiddenWord += hiddenWord[i];
    }
  }
  return newHiddenWord;
}



function invalidInput(letter)
{
  if (!(letter >= "a") && letter <= "z")
  {
    return `The ${letter} character is not in the range of 'a' and 'z'.`
  }
}



function add(list)
{
  console.log("\nPlease enter the word you would like to add: ")
  answer = asking();
  answer = answer.toLowerCase();
  console.log(`\nAdding ${answer} to the list ...`); 
  if (answer.length < 2 || list.includes(answer))
  {
    console.log("\nFailed ...\nThe word added is less than 2 characters or already in the list, please provide another one.");
    return add(list);
  }
  else
  {
    list.push(answer);
    console.log("Sucess ...\n");
  }
}



function attemptCount(min, max)
{
  return `\nRemaining attempt: ${max - min - 1}`;
}



function validAttempt(letter, list)
{
  for (let i = 0; i < list.length; i++)
  {
    if (list[i] === letter)
    {
      return `The letter ${letter} was already attempted before.`;
    }
  }
  return false;
}



function restart(answer)
{
  if (answer == "y" || answer == "yes")
  {
    return true;
  }
  return false;
}



function error(min, max)
{
  return `Number of error: ${min + 1} / ${max}`
}



function attemptSettingValidation(value)
{
  if (value >= 3 && value <= 14)
  {
    return true;
  }
  return false;
}



module.exports = {
  win, gameOver, Menu, asking, transform, verifyLetter, randomWord, update, invalidInput, add, attemptCount, restart, validAttempt, error, attemptSettingValidation
}
