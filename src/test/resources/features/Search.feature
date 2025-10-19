 Feature: Retrieve search results

 Scenario: Retrieve search results
    Given I am on the "https://www.bbc.com/sport"
    When I search for "Sport in 2023"
    Then I should see at least 4 relevant results