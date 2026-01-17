#include <stdio.h>

int main() {
    int sum = 0;  // Variable to store the sum

    // Loop from 1 to 10
    for (int i = 1; i <= 100; i++) {
        sum += i;  // Add i to sum
    }

    // Print the result
    printf("The sum of numbers from 1 to 10 is: %d\n", sum);

    return 0;
}
