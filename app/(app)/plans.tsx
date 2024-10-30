import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import { useStripe } from '@stripe/stripe-react-native';
import type { themeType } from '@/types/general';

type planType = {
  id: number | string;
  head: string;
  description: string;
  price: string;
  features: string[];
  amount: number;
};

const PlansPage = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = 'http://192.168.1.139:8000';

  const styles = getStyles(theme, isLoading);

  // Function to fetch payment sheet parameters with the selected amount
  const fetchPaymentSheetParams = async (amount: number) => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount, // Using the passed amount
      }),
    });

    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  // Function to initialize the payment sheet
  const initializePaymentSheet = async (planAmount: number) => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams(planAmount);

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'EduVenture Mubarak',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Amr Shoukry',
      },
    });

    if (!error) {
      return true;
    }
    alert('Failed to initialize payment sheet:');
    return false;
  };

  // Function to open the payment sheet
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      alert(`Error: ${error.message}`);
      alert('Payment error:');
    } else {
      alert('Success! Your order is confirmed.');
    }
  };

  // Handler for proceeding with a payment
  const handleProceed = async (plan: planType) => {
    try {
      setIsLoading(true); // Start the loading spinner
      const initialized = await initializePaymentSheet(plan.amount * 100); // Use the plan's amount here
      if (initialized) {
        await openPaymentSheet();
      }
    } catch (error) {
      alert('Payment process error:');
    } finally {
      setIsLoading(false); // Stop the loading spinner
    }
  };

  const handleCancel = (plan: planType) => {
    // Logic for cancelling subscriptions can go here
  };

  // Render plans dynamically
  const renderPlans = (plans: planType[]) => {
    return plans.map((plan: planType) => (
      <View key={plan.id} style={styles.planContainer}>
        <Text style={styles.headText}>{plan.head}</Text>
        <Text style={styles.descriptionText}>{plan.description}</Text>
        <Text style={styles.priceText}>{plan.price}</Text>
        {plan.features.map((feature, index) => (
          <Text key={feature} style={styles.featureText}>
            - {feature}
          </Text>
        ))}
        {activeTab === 'teams' && (
          <TouchableOpacity
            style={styles.proceedButton}
            disabled={isLoading} // Disable if loading
            onPress={() => handleCancel(plan)}>
            <Text style={styles.buttonText}>
              {t('plans.cancelSubscription')}
            </Text>
          </TouchableOpacity>
        )}
        {activeTab === 'individuals' && (
          <TouchableOpacity
            style={styles.proceedButton}
            disabled={isLoading} // Disable if loading
            onPress={() => handleProceed(plan)}>
            <Text style={styles.buttonText}>{t('plans.proceedToPayment')}</Text>
          </TouchableOpacity>
        )}
      </View>
    ));
  };

  const [activeTab, setActiveTab] = useState('teams');

  const plansData = {
    teams: [
      {
        id: 1,
        head: t('plans.teams.one.head'),
        description: t('plans.teams.one.description'),
        price: t('plans.teams.one.price'),
        features: [
          t('plans.teams.one.feature1'),
          t('plans.teams.one.feature2'),
          t('plans.teams.one.feature3'),
        ],
        amount: 1000,
      },
      {
        id: 2,
        head: t('plans.teams.two.head'),
        description: t('plans.teams.two.description'),
        price: t('plans.teams.two.price'),
        features: [
          t('plans.teams.two.feature1'),
          t('plans.teams.two.feature2'),
          t('plans.teams.two.feature3'),
        ],
        amount: 200,
      },
      {
        id: 3,
        head: t('plans.teams.three.head'),
        description: t('plans.teams.three.description'),
        price: t('plans.teams.three.price'),
        features: [
          t('plans.teams.three.feature1'),
          t('plans.teams.three.feature2'),
          t('plans.teams.three.feature3'),
        ],
        amount: 300,
      },
    ],
    individuals: [
      {
        id: 1,
        head: t('plans.individuals.one.head'),
        description: t('plans.individuals.one.description'),
        price: t('plans.individuals.one.price'),
        features: [
          t('plans.individuals.one.feature1'),
          t('plans.individuals.one.feature2'),
          t('plans.individuals.one.feature3'),
        ],
        amount: 40,
      },
      {
        id: 2,
        head: t('plans.individuals.two.head'),
        description: t('plans.individuals.two.description'),
        price: t('plans.individuals.two.price'),
        features: [
          t('plans.individuals.two.feature1'),
          t('plans.individuals.two.feature2'),
          t('plans.individuals.two.feature3'),
        ],
        amount: 500,
      },
      {
        id: 3,
        head: t('plans.individuals.three.head'),
        description: t('plans.individuals.three.description'),
        price: t('plans.individuals.three.price'),
        features: [
          t('plans.individuals.three.feature1'),
          t('plans.individuals.three.feature2'),
          t('plans.individuals.three.feature3'),
        ],
        amount: 600,
      },
    ],
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('pages.plans'),
          headerShown: true,
        }}
      />

      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={activeTab === 'teams' ? styles.activeTab : styles.tab}
            onPress={() => setActiveTab('teams')}>
            <Text
              style={
                activeTab === 'teams' ? styles.activeTabText : styles.tabText
              }>
              {t('plans.teamsText')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 'individuals' ? styles.activeTab : styles.tab}
            onPress={() => setActiveTab('individuals')}>
            <Text
              style={
                activeTab === 'individuals'
                  ? styles.activeTabText
                  : styles.tabText
              }>
              {t('plans.individualsText')}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {activeTab === 'teams'
            ? renderPlans(plansData.teams)
            : renderPlans(plansData.individuals)}
        </ScrollView>
      </View>
    </>
  );
};

export default PlansPage;

function getStyles(theme: themeType, isLoading: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.backgroundColor,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    tab: {
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.textColor,
    },
    tabText: {
      color: theme.colors.lessons,
    },
    activeTabText: {
      color: theme.colors.textColor,
      fontWeight: 'bold',
    },
    scrollView: {
      flex: 1,
    },
    planContainer: {
      marginBottom: 20,
      padding: 15,
      borderWidth: 1,
      borderColor: theme.colors.textColor,
      borderRadius: 10,
    },
    headText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.textColor,
    },
    descriptionText: {
      marginVertical: 5,
      color: theme.colors.textColor,
    },
    priceText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 5,
      color: theme.colors.textColor,
    },
    featureText: {
      color: theme.colors.textColor,
    },
    proceedButton: {
      marginTop: 10,
      backgroundColor: isLoading ? 'gray' : theme.colors.textColor,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      textAlign: 'center',
      color: theme.colors.backgroundColor,
    },
  });
}

