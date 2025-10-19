Feature: Validation BBC Sports Result

Title: As a BBC editor, I want to accurately report the results of the 2023 Las Vegas Grand Prix, where Max Verstappen took 1st place, 
George Russell finished 2nd, and Sergio Perez secured 3rd place, so that my audience is informed about the key highlights of the race.
    

  Scenario: Verify the top 3 finishers of the 2023 Las Vegas Grand Prix on BBC Sport
     Given I am on the BBC Sport "Formula"
     When I search Result for the "2023" "Las Vegas Grand Prix"
     Then the top 3 finishers should be:
       | Rank | Driver           |
       | 1    | Max Verstappen   |
       | 2    | George Russell   |
       | 3    | Sergio Perez     |
  
    
