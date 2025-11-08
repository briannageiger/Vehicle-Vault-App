import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { BarChart, PieChart } from "react-native-gifted-charts";

export default function AnalyticsScreen({ navigation, route }) {
  const { payments } = route.params || {};
  console.log("Payments received in Analytics: ", payments);

  let year = new Date().getFullYear();
  let average = 0.0;

  // process payment data for monthly costs bar chart
  const processPayments = (payments) => {
    const monthlyTotals = Array(12).fill(0);
    let i = 0;

    payments.forEach((payment) => {
      const [month, day, year] = payment.date.split("-");
      const date = new Date(year, month - 1, day);
      const monthIndex = date.getMonth();
      const amt = payment.amount;

      monthlyTotals[monthIndex] += parseFloat(amt);
      console.log(
        "Payment " +
          ++i +
          "\n\t\t Date: " +
          payment.date +
          "\n\t\t Added $" +
          amt +
          " to month " +
          (monthIndex + 1)
      );
    });

    monthlyTotals.forEach((total) => {
      average += total;
    });

    average /= 12;
    console.log("Average: $" + average.toFixed(2));

    console.log("Monthly totals: ", monthlyTotals);

    return monthlyTotals.map((value, index) => ({
      value,
      label: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][index],
    }));
  };

  // process payment data for cost structure pie chart by category
  const processPaymentCategories = (payments) => {
    const categoryTotals = Array(6).fill(0);
    const percentageTotals = Array(6).fill(0);
    let grandTotalAmt = 0;

    payments.forEach((payment) => {
      const category = payment.category;
      const amt = parseFloat(payment.amount);
      let catIndex;

      switch (category) {
        case "Car Payment":
          catIndex = 0;
          break;
        case "Insurance":
          catIndex = 1;
          break;
        case "Refuel":
          catIndex = 2;
          break;
        case "Car Wash":
          catIndex = 3;
          break;
        case "Maintenance":
          catIndex = 4;
          break;
        default:
          catIndex = 5;
          break;
      }

      categoryTotals[catIndex] += amt;
      grandTotalAmt += amt;
    });

    for (let k = 0; k < percentageTotals.length; k++) {
      percentageTotals[k] = categoryTotals[k] / grandTotalAmt;
      percentageTotals[k] *= 100;
      percentageTotals[k] = percentageTotals[k].toFixed(1);
    }

    console.log(
      "Cost Structure Category Totals: " +
        categoryTotals +
        "\nCost Structure Percentage Totals: " +
        percentageTotals
    );

    return categoryTotals.map(
      (value, catIndex) =>
        [
          {
            value: categoryTotals[catIndex],
            text: `Car Payment - ${percentageTotals[catIndex]}%`,
            color: "#009FFF",
          },
          {
            value: categoryTotals[catIndex],
            text: `Insurance - ${percentageTotals[catIndex]}%`,
            color: "#93FCF8",
          },
          {
            value: categoryTotals[catIndex],
            text: `Refuel - ${percentageTotals[catIndex]}%`,
            color: "#BDB2FA",
          },
          {
            value: categoryTotals[catIndex],
            text: `Car Wash - ${percentageTotals[catIndex]}%`,
            color: "#FFA5BA",
          },
          {
            value: categoryTotals[catIndex],
            text: `Maintenance - ${percentageTotals[catIndex]}%`,
            color: "#65DB86",
          },
          {
            value: categoryTotals[catIndex],
            text: `Other - ${percentageTotals[catIndex]}%`,
            color: "#EDA74A",
          },
        ][catIndex]
    );
  };

  const monthlyData = processPayments(payments);

  const categoryData = processPaymentCategories(payments);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated backgroundColor={"#D9D9D9"} />
      <TopBar headingTitle="Analytics" />
      <View style={styles.tab}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnTxt}
        >
          <Text>Finances</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.itemsContainer}>
        <Text style={styles.text}>Monthly Costs</Text>
        <View style={styles.monthlyContainer}>
          <View>
            <Text style={styles.avgTxt}>Average per month:</Text>
            <Text style={[styles.avgTxt, { fontWeight: 700 }]}>
              ${average.toFixed(2)}
            </Text>
            <Text style={styles.yearTxt}>
              Jan {year}-Dec {year}
            </Text>
          </View>
          <BarChart
            data={monthlyData}
            barWidth={22}
            spacing={15}
            isAnimated
            frontColor="#3498db"
          />
        </View>
        <Text style={styles.text}>Cost Structure</Text>
        <View style={styles.costContainer}>
          <View style={styles.pieChart}>
            <PieChart
              data={categoryData}
              showTooltip
              showExternalLabels={false}
              tooltipBackgroundColor={"#D9D9D9"}
              labelLineConfig={{
                tailLength: 0,
              }}
              isAnimated
              textColor="#000"
              donut
              innerRadius={65}
              radius={125}
              extraRadius={5}
              inwardExtraLengthForFocused={5}
              focusOnPress={true}
            />
          </View>
          <View style={styles.labels}>
            {categoryData.map((item, index) => (
              <View key={index} style={styles.labelView}>
                <View
                  style={[styles.colors, { backgroundColor: item.color }]}
                ></View>
                <Text style={styles.categoryText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  btnTxt: {
    fontSize: 22,
    padding: 5,
    marginLeft: "2%",
    opacity: 0.75,
  },
  itemsContainer: {
    height: "75%",
  },
  text: {
    fontSize: 22,
    padding: 5,
  },
  monthlyContainer: {
    padding: 10,
  },
  avgTxt: {
    fontSize: 20,
    marginBottom: 3,
  },
  yearTxt: {
    fontSize: 17,
    marginBottom: 5,
  },
  costContainer: {
    height: "100%",
    padding: 5,
    alignItems: "center",
  },
  pieChart: {
    marginBottom: 5,
  },
  labels: {
    maxWidth: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  labelView: {
    flexDirection: "row",
    padding: 15,
  },
  colors: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight: 5,
  },
  categoryText: {
    fontSize: 16,
  },
});
