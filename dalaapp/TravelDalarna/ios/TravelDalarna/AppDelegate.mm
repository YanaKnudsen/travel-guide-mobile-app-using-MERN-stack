#import "AppDelegate.h"
//#import <GoogleMaps/GoogleMaps.h>
#import "RNSplashScreen.h"  // here
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>




@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //[GMSServices provideAPIKey:@"AIzaSyACr6SlHFxRPzNF2xse8pnajgAYmfXHqnw"]; // add this line using the api key obtained from Google Console
  self.moduleName = @"TravelDalarna";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [super application:application didFinishLaunchingWithOptions:launchOptions];
      [RNSplashScreen show];
 return YES;

 // return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


@end
